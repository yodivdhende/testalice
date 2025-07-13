import { mysqlconnFn } from './mysql';

class EventRepo {

	public async getAll(): Promise<LarpEvent[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(`
                SELECT
                    Id as id,
                    Name as name,
                    StartTime as start,
                    EndTime as end,
                FROM Events
            `);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const events: LarpEvent[] = [];
			for (let eventResult of result) {
				if (isLarpEvent(eventResult)) events.push(eventResult);
				else
					console.log(`%c sql result is not event`, `background:red;color:black`, { eventResult });
			}
			return events;
		} catch (err) {
			throw err;
		}
	}
	
	public save({id, name, start, end}: LarpEvent) {
		if(id == null)	return this.create({name, start, end});
		return this.edit({id,name,start,end});
	}

	public async create({ name, start, end }: Omit<LarpEvent, 'id'>) {
		try {
			const connection = await mysqlconnFn();
			await connection.execute(
				`
                INSERT Events (Name, StartTime, EndTime)
                VALUES (?,?,?)
            `,
				[name, start, end]
			);
		} catch (err) {
			throw err;
		}
	}

	public async edit({ id, name, start, end }: LarpEvent) {
		try {
			const connection = await mysqlconnFn();
			await connection.execute(
				`
                UPDATE Events
                SET name = ?,
                StartTime = ?,
                EndTime = ?
                WHERE id = ?
            `,
				[name, start, end, id]
			);
		} catch (err) {
			throw err;
		}
	}

	public async delete({id}: {id: number})  {
		try {
			const connection = await mysqlconnFn();
			await connection.execute(`
                DELETE 
                FROM Events
                WHERE Id = ?
            `, [id]);
		} catch (err) {
			throw err;
		}
	}
    
	public async getForCharacter({characterId}: {characterId: number}): Promise<LarpEvent[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(`
                SELECT
                    e.Id as id,
                    e.Name as name,
                    e.StartTime as start,
                    e.EndTime as end
                FROM Events e
                JOIN Event_Participants ep
                    on ep.event = e.id
                WHERE ep.CharacterId = ?
                GROUP BY
                     id,
                     name,
                     start,
                     end
            `,[characterId]);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const events: LarpEvent[] = [];
			for (let eventResult of result) {
				if (isLarpEvent(eventResult)) events.push(eventResult);
				else
					console.log(`%c sql result is not event`, `background:red;color:black`, { eventResult });
			}
			return events;
		} catch (err) {
			throw err;
		}
	}
}

export const eventRepo = new EventRepo();

type LarpEvent = {
	id: number | null;
	name: string;
	start: Date;
	end: Date;
};
export function isLarpEvent(event: unknown): event is LarpEvent {
	return typeof event === 'object' &&
		event != null &&
		'name' in event &&
		typeof event.name === 'string' &&
		'start' in event &&
		event.start instanceof Date &&
		'end' in event &&
		event.end instanceof Date &&
		'id' in event &&
		(
			event.id == null ||
			typeof event.id === 'number'
		)		
}
