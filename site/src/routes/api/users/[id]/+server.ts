import { isUser, userRepo } from "$lib/db/user.repo.svelte";
import { isNumberOrError } from "$lib/request.utils";
import { RequestError } from "$lib/types/errors";
import { handleRequest } from "$lib/utils/request";
import {  json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler  = async ({params})  => {
    return await handleRequest(async () => json(await requestUser(params)));
}

export const POST: RequestHandler = async ({request}) => {
    return handleRequest(async () => {
        await updateUser(await request.json());
        return new Response();
    });
}

export async function requestUser({id}: {id?: any}) {
        const numberId = isNumberOrError(id);
        return await userRepo.getById({id: numberId});
}

export async function updateUser({user}: {user?: any}) {
    if(isUser(user)) {
        await userRepo.update(user);
    }
        
    throw new RequestError(400, "body was not of type character");

}
