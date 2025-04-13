import { authenticationRepo } from "$lib/db/authentication.repo";
import type { RequestHandler } from "@sveltejs/kit";
import { error } from "console";

export const POST: RequestHandler = async ({request}) =>  {
    try {
        const {name, email, password} = await request.json();
        await authenticationRepo.register({name,email,password});
        return new Response();
    } catch (err) {
        return error(err);
    }
}