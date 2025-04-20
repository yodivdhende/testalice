import { connectionRepo } from "$lib/db/connection.repo";
import { error } from "console";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    try {
        const connections  = await connectionRepo.getAll();
        return { connections }
    } catch(err){
       return error(500, `${err}`);
    }
}

