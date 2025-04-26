import { userRepo } from "$lib/db/user.repo.svelte";
import { NoAccesRequest } from "$lib/types/errors";
import { getConnectionToken } from "$lib/utils/cookies";
import { authGuard, handleRequest } from "$lib/utils/request";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies}) => {
    return handleRequest(async () => {
        const token = await getConnectionToken(cookies);
        const users = await getUsersForToken(token);
        return json(users);
    })
 }

 export async function getUsersForToken(token:string) {
    const {roles, userId} = await authGuard(token, ['admin', 'user']);
    if(roles.includes('admin')) return userRepo.getAll();
    if(roles.includes('user')) return [await userRepo.getById({id: userId})];
    throw new NoAccesRequest();
 }