import type { PageServerLoad } from './$types';
import { handleRequest } from '$lib/utils/request';
import { skillRepo } from '$lib/db/skills.repo';
import { RequestError } from '$lib/types/errors';

export const load: PageServerLoad = async ({ params, fetch }) => {
	return handleRequest(async () => {
		const skillGroups = await skillRepo.getAllGroups();
		if(skillGroups == null) return new RequestError(500, `can't fetch skill groups`);

		const {id} = params;
		if (id == null || typeof id != 'string') return { skill: undefined, groups: skillGroups};

		const skill = await (await fetch(`/api/skills/${id}`,{ method: 'GET' })).json();
		if (skill == null) return { skill: undefined, groups: skillGroups};

		return { skill, groups: skillGroups};
	});
};


