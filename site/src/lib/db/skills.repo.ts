import { group } from 'console';
import { mysqlconnFn } from './mysql';

class ItemRepo {
	public async getAll(): Promise<Skill[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(`
			 SELECT
					s.Id,
					s.Name,
					s.Description,
					sg.Id,
					sg.Name
				FROM Skills s
				JOIN Skill_Groups sg
					on s.Group = sg.Id
      `);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const skills: Skill[] = [];
			for (let skillResult of result) {
				if (isSkill(skillResult)) skills.push(skillResult);
				else
					console.log(`%c sql result is not a item`, `background:red;color:black`, { itemResult: skillResult });
			}
			return skills;
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
					s.Id,
					s.Name,
					s.Description,
					sg.Id,
					sg.Name
				FROM Skills s
				JOIN Skill_Groups sg
					on s.Group = sg.Id
				WHERE s.id = ?
        `,
				[id]
			);
			if (Array.isArray(result) === false) return null;
			if (result.length === 0) return null;
			const [skill] = result;
			if (isSkill(skill) === false) return null;
			return skill;
		} catch (err) {
			throw err;
		}
	}

	public save(item: Skill) {
		if (item.id == null) return this.create(item);
		return this.edit(item);
	}

	public async create({ name, description, groupId }: Pick<Skill, 'name' | 'description' | 'groupId'>) {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
				INSERT INTO Skills (Name, Description, Group)
				Values (?,?, ?)
        `,
				[name, description, groupId]
			);
			console.log('create item', result);
			if (Array.isArray(result) === false) return null;
			if (result.length === 0) return null;
			const [skill] = result;
			if (isSkill(skill) === false) return null;
			return skill;
		} catch (err) {
			throw err;
		}
	}

	public async edit({ id, name, description, groupId }: Pick<Skill, 'id' | 'name' | 'description' | 'groupId'>) {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
				UPDATE Skills 
				SET Name = ?,
				Description = ?,
				Group = ?
				WHERE Id = ?
        `,
				[name, description, groupId,id]
			);
			console.log('edit item', result);
			if (Array.isArray(result) === false) return null;
			if (result.length === 0) return null;
			const [skill] = result;
			if (isSkill(skill) === false) return null;
			return skill;
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
                FROM Skill 
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
		eventId,
	}: {
		characterId: number;
		eventId: number | undefined;
	}): Promise<Skill[]> {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(
				`
				SELECT
					s.Id,
					s.Name,
					s.Description,
					sg.Id,
					sg.Name
				FROM Skills s
				JOIN Skill_Groups sg
					on s.Group = sg.Id
        JOIN Character_Skills cs 
          ON s.Id = cs.ItemId
					AND cs.Character = ?
					${eventId ? 'AND cs.Event = ?' : ''}
        `,
				[characterId, eventId],
			);
			if (Array.isArray(result) === false) return [];
			if (result.length === 0) return [];
			const skills: Skill[] = [];
			for (let skillResult of result) {
				if (isSkill(skillResult)) skills.push(skillResult);
				else
					console.log(`%c sql result is not a skill`, `background:red;color:black`, { skillResult });
			}
			return skills;
		} catch (err) {
			throw err;
		}
	}

	public saveSkillGroup(skillGroup: SkillGroup){
		if(skillGroup.id == null) return this.createSkillGroup(skillGroup);
		return this.editSkillGroup(skillGroup);
	}

	private async createSkillGroup({ name, description}: Pick<SkillGroup, 'name'| 'description'>) {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(`
				INSERT INTO Skill_Groups (Name, Description)
				VALUES (?,?)
      `, [name, description]);
			if ('serverStatus' in result && result.serverStatus !== 2) return null;
			if ('insertId' in result === false || result.insertId == null) return null;
			return result.insertId;
		} catch (err) {
			throw err;
		}
	}

	private async editSkillGroup({id,  name, description}: Pick<SkillGroup, 'id' | 'name'| 'description'>) {
		try {
			const connection = await mysqlconnFn();
			const [result] = await connection.execute(`
				UPDATE Skill_Groups
				SET Name = ?,
				Description = ?
				WHERE Id = ?
      `, [name, description, id]);
			if ('serverStatus' in result && result.serverStatus !== 2) return null;
			return id;
		} catch (err) {
			throw err;
		}
	}

	public async addItemToCharacter({
		item,
		characterId
	}: {
		item: Skill;
		characterId: number;
	}): Promise<void> {}
}
export const itemRepo = new ItemRepo();

export type Skill = {
	id: number | null;
	name: string;
	description: string;
	groupId: number;
	groupName: string;
};

export function isSkill(skill: unknown): skill is Skill {
	return (
		typeof skill === 'object' &&
		skill !== null &&
		'name' in skill &&
		typeof skill.name === 'string' &&
		'description' in skill &&
		typeof skill.description === 'string' &&
		'groupId' in skill &&
		typeof skill.groupId === 'number' &&
		'groupName' in skill &&
		typeof skill.groupName === 'string' &&
		'id' in skill &&
		(typeof skill.id === 'number' || skill.id === null)
	);
}

export type SkillGroup = {
	id: number | null;
	name: string;
	description: string;
}

export function isSkillGroup(group: unknown): group is SkillGroup {
	return (
		typeof group === 'object' &&
		group !== null &&
		'name' in group &&
		typeof group.name === 'string' &&
		'description' in group &&
		typeof group.description === 'string' &&
		'id' in group &&
		(typeof group.id === 'number' || group.id === null)
	);

}

