import { mysqlconnFn } from './mysql';

class CharacterVersionRepo {
	public async getAll(): Promise<CharacterVersionBare[]> {
		const connection = await mysqlconnFn();
		const [results] = await connection.execute(`
      SELECT 
        cv.Id as id, 
        cv.Character as characterId,
        cv.Name as name,
      FROM Character_Versions cv
      `);
		if (Array.isArray(results) === false) return [];
		if (results.length === 0) return [];
    const ids = results.map(([id])=> id).filter(id => typeof id === 'number');
    const [ items, implants, skills ] = await  Promise.allSettled([
      this.getItemsforCharacterVersions(ids),
      this.getImplantsforCharacterVersions(ids),
      this.getSkillsForCharacterVerions(ids),
     ])
		const characterVersions: CharacterVersionBare[] = [];
		for (let characterItem of results) {
      if('id' in characterItem === false || typeof characterItem.id != 'number') continue;
      if('characterId' in characterItem === false || typeof characterItem.characterId != 'number') continue;
      if('name' in characterItem === false || typeof characterItem.name != 'string') continue;
      characterVersions.push({
        id: characterItem.id,
        name: characterItem.name,
        characterId: characterItem.charaacterId,
        skills: skills.status === 'fulfilled'
        ?  skills.value.filter(({characterVersionId}) => characterVersionId, characterItem.characterId).map(({skillId, value})=> ({skillId, value}))
        : [],
        items: items.status === 'fulfilled'
          ?  items.value.filter(({characterVersionId}) => characterVersionId, characterItem.characterId).map(({itemId}) => itemId)
          : [],
        implants: implants.status === 'fulfilled'
        ?  implants.value.filter(({characterVersionId}) => characterVersionId, characterItem.characterId).map(({implantId}) => implantId)
        : [],
      })
		}
		return characterVersions;
	}

	public async getItemsforCharacterVersions(
		ids: number[]
	): Promise<{ characterVersionId: number; itemId: number }[]> {
		const connection = await mysqlconnFn();
		const [result] = await connection.execute(
			`
      SELECT 
        cvit.CharacterVersion as characterVerionId
        cvit.Item as itemId,
      FROM Character_Version_Items cvit
      WHERE cvit.CharacterVersion in :ids
      `,
			{ ids }
		);
		if (Array.isArray(result) === false) return [];
		if (result.length === 0) return [];
		const items: { characterVersionId: number; itemId: number }[] = [];
		for (let item of result) {
			if ('characterVersionId' in item === false || typeof item.characterVersionId !== 'number')
				continue;
			if ('itemId' in item === false || typeof item.itemId != 'number') continue;
			items.push({ characterVersionId: item.characterVersionId, itemId: item.itemId });
		}
		return items;
	}

	public async getImplantsforCharacterVersions(
		ids: number[]
	): Promise<{ characterVersionId: number; implantId: number }[]> {
		const connection = await mysqlconnFn();
		const [result] = await connection.execute(`
      SELECT 
        cvim.CharacterVerion as characterVersion,
        cvim.Implant as implant
      FROM Character_Version_Implants cvim
      WHERE cvim.CharacterVersion in :ids
      `, {ids});
		if (Array.isArray(result) === false) return [];
		if (result.length === 0) return [];
		const implants: { characterVersionId: number; implantId: number }[] = [];
		for (let item of result) {
			if ('characterVersionId' in item === false || typeof item.characterVersionId !== 'number')
				continue;
			if ('implantId' in item === false || typeof item.implantId != 'number') continue;
			implants.push({ characterVersionId: item.characterVersionId, implantId: item.implantId});
		}
		return implants;
	}

	public async getSkillsForCharacterVerions(
		ids: number[]
	): Promise<{ characterVersionId: number; skillId: number, value: number}[]> {
		const connection = await mysqlconnFn();
		const [result] = await connection.execute(`
      SELECT 
        cvs.CharacterVerion as characterVersion,
        cvs.Skill as skill,
        cvs.Value as value
      FROM Character_Version_Skills cvs
      WHERE cvs.CharacterVersion in :ids
      `, {ids});
		if (Array.isArray(result) === false) return [];
		if (result.length === 0) return [];
		const skills: { characterVersionId: number; skillId: number, value: number}[] = [];
		for (let item of result) {
			if ('characterVersionId' in item === false || typeof item.characterVersionId !== 'number')
				continue;
			if ('skillId' in item === false || typeof item.skillId != 'number') continue;
			if ('value' in item === false || typeof item.value != 'number') continue;
			skills.push({ characterVersionId: item.characterVersionId, skillId: item.skillId, value: item.value});
		}
		return skills;
	}

	public async getWithdIds(ids: number[]): Promise<CharacterVersionBare[]> {
		const connection = await mysqlconnFn();
		const [results] = await connection.execute(`
      SELECT 
        cv.Id as id, 
        cv.Character as characterId,
        cv.Name as name,
      FROM Character_Versions cv
      WHERE cv.id in :ids
      `,{ids});
		if (Array.isArray(results) === false) return [];
		if (results.length === 0) return [];
    const existingIds = results.map(([id])=> id).filter(id => typeof id === 'number');
    const [ items, implants, skills ] = await  Promise.allSettled([
      this.getItemsforCharacterVersions(existingIds),
      this.getImplantsforCharacterVersions(existingIds),
      this.getSkillsForCharacterVerions(existingIds),
     ])
		const characterVersions: CharacterVersionBare[] = [];
		for (let characterItem of results) {
      if('id' in characterItem === false || typeof characterItem.id != 'number') continue;
      if('characterId' in characterItem === false || typeof characterItem.characterId != 'number') continue;
      if('name' in characterItem === false || typeof characterItem.name != 'string') continue;
      characterVersions.push({
        id: characterItem.id,
        name: characterItem.name,
        characterId: characterItem.charaacterId,
        skills: skills.status === 'fulfilled'
        ?  skills.value.filter(({characterVersionId}) => characterVersionId, characterItem.characterId).map(({skillId, value})=> ({skillId, value}))
        : [],
        items: items.status === 'fulfilled'
          ?  items.value.filter(({characterVersionId}) => characterVersionId, characterItem.characterId).map(({itemId}) => itemId)
          : [],
        implants: implants.status === 'fulfilled'
        ?  implants.value.filter(({characterVersionId}) => characterVersionId, characterItem.characterId).map(({implantId}) => implantId)
        : [],
      })
		}
		return characterVersions;
  }

	public async getWithId(id: number): Promise<CharacterVersionBare | undefined> {
		return (await this.getWithdIds([id]))[0];
	}

	public save(characterVersion: CharacterVersionBare): Promise<number> {
		if (characterVersion.id != null) return this.update(characterVersion);
		return this.create(characterVersion);
	}

	public async create(characterVersion: CharacterVersionBare): Promise<number> {
  }

	public async update(characterVersion: CharacterVersionBare): Promise<number> {}

	public async delete(id: number): Promise<void> {}
}
export const characterVersionRepo = new CharacterVersionRepo();

export type CharacterVersionBare = {
	id: number | null;
	name: string;
	characterId: number;
	skills: {
		skillId: number;
		value: number;
	}[];
	items: number[];
	implants: number[];
};

export function isCharacterVersionBare(value: unknown): value is CharacterVersionBare {
	return (
		typeof value === 'object' &&
		value != null &&
		'id' in value &&
		(typeof value.id === 'number' || value.id == null) &&
		'name' in value &&
		typeof value.name === 'string' &&
		'characterId' in value &&
		typeof value.characterId === 'number' &&
		'skills' in value &&
		Array.isArray(value.skills) &&
		value.skills.every((skill) => {
			return (
				typeof skill === 'object' &&
				skill != null &&
				'skillId' in skill &&
				typeof skill.skillId === 'number' &&
				'value' in skill &&
				typeof skill.value === 'number'
			);
		}) &&
		'items' in value &&
		Array.isArray(value.items) &&
		value.items.every((item) => typeof item === 'number') &&
		'implants' in value &&
		Array.isArray(value.implants) &&
		value.implants.every((implant) => typeof implant === 'number')
	);
}
