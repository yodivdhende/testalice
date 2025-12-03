import { userRepo } from "$lib/db/user.repo.svelte";
import { handleRequest } from "$lib/utils/request";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	return handleRequest(async () => {
		return {
			users: await userRepo.getAll()
		};
	});
};