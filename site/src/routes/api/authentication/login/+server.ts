import { authenticationRepo } from "$lib/db/authentication.repo";
import { connectionRepo } from "$lib/db/connection.repo";
import { RequestError } from "$lib/types/errors";
import { handleRequest } from "$lib/utils/request";
import { getTommorow } from "$lib/utils/time";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    return handleRequest(async () => {
        return json(await requestConnectionTokenAndRole(await request.json()));
    });
}

export async function requestConnectionTokenAndRole({email,password}: {email?:any, password?:any}) {
        if(typeof email === 'string' && password) {
            const roles = await authenticationRepo.getRoles({email, password});
            if(roles == null) throw new RequestError(400, 'needs email and password');
            const token = await connectionRepo.create({roles, endDate:  getTommorow(), descripiton: 'api login'});
            return {token, roles};
        }
        throw new RequestError(400, 'needs email and password')
}