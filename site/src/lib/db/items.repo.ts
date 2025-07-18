import { mysqlconnFn } from './mysql';

class EventRepo {
	public async getAll(): Promise<Item[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(`
        SELECT
          i.Id as id,
          i.Name as name,
          i.Description as description
        FROM Items i
        `);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const items: Item[] = [];
			for (let itemResult of result) {
				if (isItem(itemResult)) items.push(itemResult);
				else
					console.log(`%c sql result is not a item`, `background:red;color:black`, { itemResult });
			}
			return items;
		} catch (err) {
			throw err;
		}
	}

	public save({ id, name, description }: Item) {}

	public async create({ name, description }: Omit<Item, 'id'>) {}

	public async edit({ id, name, description }: Item) {}

	public async delete({ id }: { id: number }) {}

	public async getForCharacter({
		characterId,
		eventId
	}: {
		characterId: number;
		eventId: number;
	}): Promise<Item[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
        SELECT
          i.Id as id,
          i.Name as name,
          i.Description as description
        FROM Items i
        JOIN Character_Items ci 
          ON i.Id = ci.ItemId
        WHERE ci.CharacterId = ? AND ci.EventId = ?
        `,
				[characterId, eventId]
			);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const items: Item[] = [];
			for (let itemResult of result) {
				if (isItem(itemResult)) items.push(itemResult);
				else
					console.log(`%c sql result is not a item`, `background:red;color:black`, { itemResult });
			}
			return items;
		} catch (err) {
			throw err;
		}
	}

	public async addItemToCharacter({
		item,
		characterId
	}: {
		item: Item;
		characterId: number;
	}): Promise<void> {}
}

export type Item = {
	id: number | null;
	name: string;
	description: string;
};

export function isItem(item: unknown): item is Item {
	return (
		typeof item === 'object' &&
		item !== null &&
		'name' in item &&
		typeof item.name === 'string' &&
		'description' in item &&
		typeof item.description === 'string' &&
		'id' in item &&
		(typeof item.id === 'number' || item.id === null)
	);
}
