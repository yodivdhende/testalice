import { characterRepo } from "$lib/db/character.repo";
import { NoAccesRequest, UnAutherizedRequestError } from "$lib/types/errors";
import { getSessionToken } from "$lib/utils/cookies";
import { authGuard, authGuardForUser, handleRequest } from "$lib/utils/request";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies}) => {
    return handleRequest(async () => {
        const token = getSessionToken(cookies);
        const characters = await getCharactersForToken(token);
        return json(characters)
    })
}

export async function getCharactersForToken(token: string) {
    const {roles, userId} = await authGuardForUser(token, ['admin', 'user']);
    if(roles.includes('admin')) return characterRepo.getAll();
    if(roles.includes('user')) return characterRepo.getForUser(userId);
    throw new NoAccesRequest();
}