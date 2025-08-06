import { mysqlconnFn } from './mysql';

class ImplantRepo {
	public async getAll(): Promise<Implant[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(`
        SELECT
          i.Id as id,
          i.Name as name,
          i.Description as description
        FROM Implants i
        `);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const implants: Implant[] = [];
			for (let implantResult of result) {
				if (isImplants(implantResult)) implants.push(implantResult);
				else
					console.log(`%c sql result is not a item`, `background:red;color:black`, { implantResult });
			}
			return implants;
		} catch (err) {
			throw err;
		}
	}

	public async getWithId(id: number) {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
        SELECT
          i.Id as id,
          i.Name as name,
          i.Description as description
        FROM Implants i
		WHERE i.Id = ?
        `,
				[id]
			);
			if (Array.isArray(result) === false) return null;
			if (result.length === 0) return null;
			const [implant] = result;
			if (isImplants(implant) === false) return null;
			return implant;
		} catch (err) {
			throw err;
		}
	}

	public save(implant: Implant) {
		if (implant.id == null) return this.create(implant);
		return this.edit(implant);
	}

	public async create({ name, description }: Omit<Implant, 'id'>) {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
				INSERT INTO Implants (Name, Description)
				Values (?,?)
        `,
				[name, description]
			);
			if ('serverStatus' in result && result.serverStatus !== 2) return null;
			if (('insertId' in result) === false || result.insertId == null) return null;
			return result.insertId;
		} catch (err) {
			throw err;
		}
	}

	public async edit({ id, name, description }: Implant) {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
				UPDATE Implants 
				SET Name = ?,
				Description = ?
				WHERE Id = ?
        `,
				[name, description, id]
			);
			if ('serverStatus' in result && result.serverStatus !== 2) return null;
			return id;
		} catch (err) {
			throw err;
		}
	}

	public async delete({ id }: { id: number }) {
		try {
			const connection = await mysqlconnFn();
			await connection.execute(
				`
                DELETE 
                FROM Implants 
                WHERE Id = ?
            `,
				[id]
			);
		} catch (err) {
			throw err;
		}
	}

	public async getForCharacter({
		characterId,
		eventId
	}: {
		characterId: number;
		eventId: number;
	}): Promise<Implant[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
        SELECT
          i.Id as id,
          i.Name as name,
          i.Description as description
        FROM Implants i
        JOIN Character_Implants ci 
          ON i.Id = ci.ImplantId
        WHERE ci.CharacterId = ? AND ci.EventId = ?
        `,
				[characterId, eventId]
			);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const implants: Implant[] = [];
			for (let implantResult of result) {
				if (isImplants(implantResult)) implants.push(implantResult);
				else
					console.log(`%c sql result is not a implant`, `background:red;color:black`, { implantResult });
			}
			return implants;
		} catch (err) {
			throw err;
		}
	}

	public async addImplantToCharacter({
		implant,
		characterId
	}: {
		implant: Implant;
		characterId: number;
	}): Promise<void> {}
}
export const implantRepo = new ImplantRepo();

export type Implant = {
	id: number | null;
	name: string;
	description: string;
};

export function isImplants(implant: unknown): implant is Implant {
	return (
		typeof implant === 'object' &&
		implant !== null &&
		'name' in implant &&
		typeof implant.name === 'string' &&
		'description' in implant &&
		typeof implant.description === 'string' &&
		'id' in implant &&
		(typeof implant.id === 'number' || implant.id === null)
	);
}
