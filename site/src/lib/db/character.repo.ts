import { mysqlconnFn } from './mysql';

class CharacterRepo {
	private characterSelector = `
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
				currentHp: firstCharacter.currentHp,
				maxHp: firstCharacter.maxHp
			};
		} else {
			throw new Error(`character not found with id: ${id}`);
		}
	}

	public async getForUser(userId: number) {
		const connection = await mysqlconnFn();
		const [result] = await connection.execute(`${this.characterSelector} WHERE u.id = ?`, [userId]);
		console.log(`%c getForUser`, `background:white;color:black`, {result});
		return [] as Character[];
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
						currentHp: character.currentHp,
						maxHp: character.maxHp
					};
				} else {
					console.error(`can't convert to character: `, { character });
					return undefined;
				}
			})
			.filter((value) => value != null);
	}

	public async save(character: NewCharacter | Character) {
		if (isNewCharacter(character)) return this.insert(character);
		if (isCharacter(character)) return this.update(character);
	}

	private async insert(character: NewCharacter) {
		try {
			(await mysqlconnFn()).execute(
				`
				INSERT Characters (Name, Owner, CurrentHp, MaxHp)
				VALUE (?, ?, ?, ?)
			`,
				[character.name, character.ownerId, character.maxHp, character.maxHp]
			);
		} catch (error) {
			throw error;
		}
	}

	private async update(character: Character) {
		try {
			(await mysqlconnFn()).execute(
				`
				UPDATE Characters
				SET Name = ?,
					Owner = ?,
					currentHp = ?,
					maxHp = ?
				WHERE id = ?
			`,
				[character.name, character.ownerId, character.maxHp, character.maxHp, character.id]
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
	currentHp: number;
	maxHp: number;
};

export function isNewCharacter(character: any): character is NewCharacter {
	return (
		typeof character?.name === 'string' &&
		typeof character?.ownerId === 'number' &&
		typeof character?.currentHp === 'number' &&
		typeof character?.maxHp === 'number'
	);
}
