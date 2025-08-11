import { type Skill } from '$lib/db/skills.repo';
import type { PageLoad } from '../characters/$types';

export const load: PageLoad = async ({ fetch }) => {
	const skillRequest = await fetch('/api/skills');
	const skills: Skill[] = await skillRequest.json();
	return { skills };
};
