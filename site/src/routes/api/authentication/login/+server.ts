import { authenticationRepo } from "$lib/db/authentication.repo";
import { connectionRepo } from "$lib/db/connection.repo";
import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({request}) => {
    try {
        const {email, password} = await request.json();
        if(email && password) {
            const role = await authenticationRepo.getRole({email, password});
            if(role == null) return error(400, 'credentials wrong');
            const token = await connectionRepo.createConnection({role, endDate:  getTommorow(), descripiton: 'api login'})
            return json({token, role});
        }
    }
}

function getTommorow(): Date {
    return new Date(new Date().getTime() + 1*24*60*60*1000);
}