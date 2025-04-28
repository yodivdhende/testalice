import { sessionRepo } from "$lib/db/session.repo";
import { UnAutherizedRequestError } from "$lib/types/errors";
import { setPotentialSessionToken } from "$lib/utils/cookies"
import { handleRequest } from "$lib/utils/request"
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad= async ({cookies}) => {
    return handleRequest(async () => {
       const token = setPotentialSessionToken(cookies);
       if(token == null) return {roles: []};
       const {roles} = await sessionRepo.getCredentials(token) ?? {};
       if(roles == null) throw new UnAutherizedRequestError();
       return {
        roles: roles,
       };
    })
}