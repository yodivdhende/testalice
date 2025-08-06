import { mysqlconnFn } from './mysql';

class CharacterRepo {
	private characterSelector = `
	SELECT
		c.Id as id,
		c.Name as name,
		c.Owner as ownerId,
		u.Name as ownerName
	FROM Characters c 
	JOIN Users u
		on u.id = c.id
	`;

	public async getById(id: number): Promise<Character> {
		const [result] = await (
			await mysqlconnFn()
		).execute(`${this.characterSelector} WHERE c.id = ?`, [id]);
		const [firstCharacter] = result as any;
		if (isCharacter(firstCharacter)) {
			return {
				id: firstCharacter.id,
				name: firstCharacter.name,
				ownerId: firstCharacter.ownerId,
				ownerName: firstCharacter.ownerName,
			};
		} else {
			throw new Error(`character not found with id: ${id}`);
		}
	}

	public async getForUser(userId: number) {
		const connection = await mysqlconnFn();
		const [result] = await connection.execute(`${this.characterSelector} WHERE u.id = ?`, [userId]);
		if(isCharacter(result) === false) return null;
		return result;
	}

	public async getAll(): Promise<Character[]> {
		const [result] = await (await mysqlconnFn()).execute(this.characterSelector);
		const characters = result as any[];
		return characters
			.map((character) => {
				if (isCharacter(character)) {
					return {
						id: character.id,
						name: character.name,
						ownerId: character.ownerId,
						ownerName: character.ownerName,
					};
				} else {
					console.error(`can't convert to character: `, { character });
					return undefined;
				}
			})
			.filter((value) => value != null);
	}

	public async save(character: NewCharacter | Character) {
		if (isNewCharacter(character)) return this.create(character);
		if (isCharacter(character)) return this.edit(character);
	}

	private async create(character: NewCharacter) {
		try {
			(await mysqlconnFn()).execute(
				`
				INSERT Characters (Name, Owner)
				VALUE (?, ?)
			`,
				[character.name, character.ownerId]
			);
		} catch (error) {
			throw error;
		}
	}

	private async edit(character: Character) {
		try {
			(await mysqlconnFn()).execute(
				`
				UPDATE Characters
				SET Name = ?,
					Owner = ?
				WHERE id = ?
			`,
				[character.name, character.ownerId,  character.id]
			);
		} catch (error) {
			throw error;
		}
	}
}

export const characterRepo = new CharacterRepo();

export type Character = NewCharacter & {
	id: number;
	ownerName: string;
};

export function isCharacter(character: any): character is Character {
	return (
		typeof character?.id === 'number' &&
		typeof character?.ownerName === 'string' &&
		isNewCharacter(character)
	);
}

export type NewCharacter = {
	name: string;
	ownerId: number;
};

export function isNewCharacter(character: any): character is NewCharacter {
	return (
		typeof character?.name === 'string' &&
		typeof character?.ownerId === 'number' 
	);
}
