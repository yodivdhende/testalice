import { authenticationRepo } from "$lib/db/authentication.repo";
import { connectionRepo } from "$lib/db/connection.repo";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    try {
        const {email, password} = await request.json();
        if(email && password) {
            const roles = await authenticationRepo.getRoles({email, password});
            if(roles == null) return error(400, 'credentials wrong');
            const token = await connectionRepo.create({roles, endDate:  getTommorow(), descripiton: 'api login'});
            return json({token, roles});
        }
        return error(400, 'needs email and password');
    } catch (err) {
        return error(500, `${err}`);
    }
}

function getTommorow(): Date {
    return new Date(new Date().getTime() + 1*24*60*60*1000);
}