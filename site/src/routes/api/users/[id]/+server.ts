import { isNewUser, isUser, userRepo } from "$lib/db/user.repo.svelte";
import { isNumberOrError } from "$lib/request.utils";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler  = async ({params})  => {
    try {
        const id = isNumberOrError(params.id);
        return json(await userRepo.getById({id}));
    } catch (err) {
        return error(500, `${err}`);
    }
}

export const POST: RequestHandler = async ({request}) => {
    const user = await request.json();
    if(isUser(user)) {
        await userRepo.update(user);
        return  new Response();
    }
        
    return error(400, "body was not of type character");
}

