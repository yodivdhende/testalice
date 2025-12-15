import type { Skill } from "$lib/db/skills.repo";

export function groupSkills(skills: Skill[] | null) {
	if (skills == null) return [];

	const groups: SkillGroupWithValue[] = [];

	skills.forEach((skill) => {
		let sortedGroup = groups.find(({ id }) => id === skill.groupId);
		if (sortedGroup == null) {
			sortedGroup = new SkillGroupWithValue({ id: skill.groupId, name: skill.groupName });
			groups.push(sortedGroup);
		}
		sortedGroup.skills.push({ ...skill, value: 0 });
	});

	return groups;
}

class SkillGroupWithValue {
	public id: number;
	public name: string;

	private _skills: (Skill & { value: number })[] = $state([]);
	public get skills() {
		return this._skills;
	}
	public set skills(skills: (Skill & { value: number })[]) {
		this._skills = skills;
	}

	private _total: number = $derived.by(() => this._skills.reduce((total, skill) => total + skill.value, 0));
	public get total() {
		return this._total;
	}

	constructor({ id, name }: { id: number, name: string }) {
		this.id = id;
		this.name = name;
	}

	public setValueOfSkill({ id: skillId, value }: { id: number, value: number }) {
		const skillIndex = this._skills.findIndex(({ id }) => id === skillId);
		if (skillIndex < 0) return;
		this._skills[skillIndex].value = value;
	}

}