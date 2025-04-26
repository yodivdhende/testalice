import { connectionRepo } from "$lib/db/connection.repo";
import { UnAutherizedRequestError } from "$lib/types/errors";
import { getPotentialConnectionToken } from "$lib/utils/cookies"
import { handleRequest } from "$lib/utils/request"
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad= async ({cookies}) => {
    return handleRequest(async () => {
       const token = getPotentialConnectionToken(cookies);
       if(token == null) return {roles: []};
       const {roles} = await connectionRepo.getCredentials(token) ?? {};
       if(roles == null) throw new UnAutherizedRequestError();
       return {
        roles: roles,
       };
    })
}