import { isCharacter, type Character } from './character.repo';
import { mysqlconnFn } from './mysql';

class EventParticipatnsRepo {

	public async participate({
		eventId,
		userId,
		characterId
	}: {
		eventId: number;
		userId: number;
		characterId: number;
	}) {
		try {
			const connection = await mysqlconnFn();
			await connection.execute(
				`
                INSERT Event_Participants (Event, User, Character)
                VALUES (?,?,?)
            `,
				[eventId, userId, characterId]
			);
		} catch (err) {
			throw err;
		}
	}

	public async withdraw({
		eventId,
		characterId
	}: {
		eventId: number;
		characterId: number;
	}) {
		try {
			const connection = await mysqlconnFn();
			await connection.execute(
				`
                DELETE Event_Participants 
                WHERE EventId = ?
                AND CharacterId = ? 
            `,
				[eventId, characterId]
			);
		} catch (err) {
			throw err;
		}
	}

	public async getPerticipants({ eventId }: { eventId: number }): Promise<Character[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
	                SELECT
		                c.Id as id,
		                c.Name as name,
		                c.Owner as ownerId,
		                u.Name as ownerName,
	                FROM Characters c 
	                JOIN Users u
		                on u.id = c.id
                    JOIN Event_Participants ep
                        on ep.characterId = c.Id
                    WHERE ep.EventId = ?
            `,
				[eventId]
			);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const characters: Character[] = [];
			for (let characterResult of result) {
				if (isCharacter(characterResult)) characters.push(characterResult);
				else
					console.error(`%c sql result is not a character`, `background:red;color:black`, { characterResult });
			}
			return characters;
		} catch (err) {
			throw err;
		}
	}

	public async getPerticipant({ eventId, characterId}: { eventId: number, characterId: number }): Promise<EventParticapant | undefined> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
	                SELECT
									  ep.EventId as eventId,
									  ep.UserId as userId,
									  ep.CharacterVersion as characterVerion
	                FROM Event_Participants  ep
                  WHERE ep.EventId = :eventId
										AND ep.CharacterId = :characterId
            `,
				{eventId, characterId}
			);
			if (Array.isArray(result) === false) return undefined;
			if (result.length === 0) return undefined;
			const [participantResult] = result;
			if (isEventParticapant(participantResult)) return participantResult;
			console.error(`%c sql result is not an participant`, `background:red;color:black`, { character: participantResult});
		} catch (err) {
			throw err;
		}
	}
	
}

export const eventParticipantsRepo = new EventParticipatnsRepo();

export type EventParticapant = {
	eventId: number;
	userId: number;
	characterVerion: number
}
export function isEventParticapant(particiapant: unknown): particiapant is EventParticapant {
	return typeof particiapant=== 'object'
	&& particiapant != null
	&& 'eventId' in particiapant
	&& typeof particiapant.eventId === 'number'
	&& 'userId' in particiapant
	&& typeof particiapant.userId === 'number'
	&& 'characterVerion' in particiapant
	&& typeof particiapant.characterVerion === 'number'
}
