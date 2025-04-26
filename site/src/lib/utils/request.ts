import { connectionRepo } from "$lib/db/connection.repo";
import { NoAccesRequest, RequestError, UnAutherizedRequestError } from "$lib/types/errors";
import type { UserRole } from "$lib/types/roles";
import { error } from "@sveltejs/kit";

export async function handleRequest<T>(cb: () => Promise<T>) {
    try {
        return await cb();
    } catch (err) {
        if(err instanceof RequestError) return err.getError();
        return error(500, `${err}`);
    }
}

export async function authGuard<T extends UserRole[]>(token:string, Roles: T): Promise<{userId: number, roles: T}> {
    const userRoleFromToken = await connectionRepo.getCredentials(token);
    if(userRoleFromToken === null) throw new UnAutherizedRequestError();
    const commonRoles: T = Roles.filter(role => userRoleFromToken.roles.includes(role)) as T;
    if(commonRoles.length === 0) throw new NoAccesRequest;

    return {userId: userRoleFromToken.userId, roles: commonRoles};
};