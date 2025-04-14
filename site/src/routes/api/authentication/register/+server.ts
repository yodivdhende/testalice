import { authenticationRepo } from "$lib/db/authentication.repo";
import { connectionRepo } from "$lib/db/connection.repo";
import {type  RequestHandler, error } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) =>  {
    try {
        const {name, email, password} = await request.json();
        await authenticationRepo.register({name,email,password});
        const roles = await authenticationRepo.getRoles({email, password});
        if(roles === null) return error(400, 'credentials wrong');
        const token = await connectionRepo.create({roles, endDate: getTommorow(), descripiton: 'api login'})
        return new Response();
    } catch (err) {
        return error(500, `${err}`);
    }
}

function getTommorow(): Date {
    return new Date(new Date().getTime() + 1*24*60*60*1000);
}