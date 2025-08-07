import { skillRepo } from "$lib/db/skills.repo";
import { RequestError } from "$lib/types/errors";
import { handleRequest } from "$lib/utils/request";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return handleRequest(async () => {
		const skillGroups = await skillRepo.getAllGroups();
		if (skillGroups == null) return new RequestError(404, 'Not found!');
		return { groups: skillGroups };
	});
};