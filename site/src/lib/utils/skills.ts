import type { Skill } from "$lib/db/skills.repo";

export function groupSkills(skills: Skill[] | null) {
	if(skills == null)return [];

		const groups: { name: string; id: number; skills: Skill[] }[] = [];

		skills.forEach((skill) => {
			let sortedGroup = groups.find(({ id }) => id === skill.groupId);
			if (sortedGroup == null) {
				sortedGroup = {
					name: skill.groupName,
					id: skill.groupId,
					skills: []
				};
				groups.push(sortedGroup);
			}
			sortedGroup.skills.push(skill);
		});

		return groups;
	}

export function createNewCharacterVersionSkillGroup(skills: Skill[]|null) {
	if(skills == null)return [];

		const groups: Record<number, {
			skills: Record<number, {value: number}>,
			total: number,
		}> = {};

		skills.forEach((skill) => {
				const group = groups[skill.groupId];
				if(group == null) {
					groups[skill.groupId] = {
						skills: {
							[skill.id??0]: { value: 0}
						},
						total: 0,
					}	;
				} else {
					groups[skill.groupId].skills[skill.id??0] = {value: 0};
					groups[skill.groupId].total = 0;
				}
		});

		return groups;
}