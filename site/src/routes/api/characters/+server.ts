import { characterRepo } from "$lib/db/character.repo.svelte";
import { NoAccesRequest, UnAutherizedRequestError } from "$lib/types/errors";
import { getConnectionToken } from "$lib/utils/cookies";
import { authGuard, handleRequest } from "$lib/utils/request";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies}) => {
    return handleRequest(async () => {
        const token = getConnectionToken(cookies);
        const characters = await getCharactersForToken(token);
        return json(characters)
    })
}

export async function getCharactersForToken(token: string) {
    const {roles, userId} = await authGuard(token, ['admin', 'user']);
    if(roles.includes('admin')) return characterRepo.getAll();
    if(roles.includes('user')) return characterRepo.getForUser(userId);
    throw new NoAccesRequest();
}