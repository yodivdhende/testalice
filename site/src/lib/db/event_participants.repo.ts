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
		                c.CurrentHP as currentHp,
		                c.MaxHp as maxHp
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
					console.log(`%c sql result is not a character`, `background:red;color:black`, { characterResult });
			}
			return characters;
		} catch (err) {
			throw err;
		}
	}
}

export const eventParticipantsRepo = new EventParticipatnsRepo();
