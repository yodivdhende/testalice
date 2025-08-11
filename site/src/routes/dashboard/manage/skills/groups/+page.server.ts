import type { SkillGroup } from "$lib/db/skills.repo";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const skillRequest = await fetch('/api/skills/groups');
	const groups: SkillGroup[] = await skillRequest.json();
	return { groups };};