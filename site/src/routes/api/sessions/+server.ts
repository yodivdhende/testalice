import { RequestError } from "$lib/types/errors";
import { authGuard, handleRequest } from "$lib/utils/request";
import { json, type RequestHandler } from "@sveltejs/kit";
import { sessionRepo } from "$lib/db/session.repo";
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
