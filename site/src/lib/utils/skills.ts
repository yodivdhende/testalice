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