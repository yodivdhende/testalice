import { authenticationRepo } from "$lib/db/authentication.repo";
import { connectionRepo } from "$lib/db/connection.repo";
import { RequestError } from "$lib/types/errors";
import { handleRequest } from "$lib/utils/request";
import { getTommorow } from "$lib/utils/time";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    return handleRequest(async () => {
        return json(await requestTokenAndRole(await request.json()));
    });
}

export async function requestTokenAndRole({email,password}: {email?:string, password?:string}) {
        if(email && password) {
            const roles = await authenticationRepo.getRoles({email, password});
            if(roles == null) throw new RequestError(400, 'needs email and password');
            const token = await connectionRepo.create({roles, endDate:  getTommorow(), descripiton: 'api login'});
            return {token, roles};
        }
        throw new RequestError(400, 'needs email and password')
}