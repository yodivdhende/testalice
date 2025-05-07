import { userRepo } from "$lib/db/user.repo.svelte";
import { NoAccesRequest, RequestError } from "$lib/types/errors";
import { getSessionToken } from "$lib/utils/cookies";
import { authGuard, handleRequest } from "$lib/utils/request";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies}) => {
    return handleRequest(async ()=>{
        const token = await getSessionToken(cookies);
        const users = await getUserOfToken(token);
        return json(users);
    })
}

 export async function getUserOfToken(token:string) {
    const {roles, userId} = await authGuard(token, ['user']);
    if (userId == null) throw new RequestError(401, "token has no access");
    if(roles.includes('user')) return await userRepo.getById({id: userId});
    throw new NoAccesRequest();
 }