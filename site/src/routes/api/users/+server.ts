import { userRepo } from "$lib/db/user.repo.svelte";
import { NoAccesRequest } from "$lib/types/errors";
import { getSessionToken } from "$lib/utils/cookies";
import { authGuard, handleRequest } from "$lib/utils/request";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies}) => {
    return handleRequest(async () => {
        const token = await getSessionToken(cookies);
        const users = await getUsers(token);
        return json(users);
    })
 }

 export async function getUsers(token:string) {
    const {roles} = await authGuard(token, ['admin']);
    if(roles.includes('admin')) return userRepo.getAll();
    throw new NoAccesRequest();
 }