import { BadRequest, RequestError } from "$lib/types/errors";
import { authGuard, authGuardForUser, handleRequest } from "$lib/utils/request";
import { json, type RequestHandler } from "@sveltejs/kit";
import { isNewSession, sessionRepo } from "$lib/db/session.repo";
import { getSessionToken } from "$lib/utils/cookies";

export const GET: RequestHandler = async ({ request, cookies}) => {
	return handleRequest(async () => {
		const  token = request.headers.get('authentication') ?? getSessionToken(cookies);
		if (typeof token !== 'string') throw new RequestError(403, 'not authenticated');
		await authGuard(token, ['admin']);
		const connections = await sessionRepo.getAll();;
		return json(connections);
	});
};

export const POST: RequestHandler = async ({request, cookies}) => { 
	return handleRequest(async ()=>{
		const oldToken: string = getSessionToken(cookies);
		await authGuardForUser(oldToken, ['admin']);
		const newSession = await request.json();
		if (isNewSession(newSession) === false) throw new BadRequest('body must be of newSessionType');
		const token = await sessionRepo.create(newSession);
		return json(token);
	})
}

