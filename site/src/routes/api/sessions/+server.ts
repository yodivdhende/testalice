import { RequestError } from "$lib/types/errors";
import { authGuard, handleRequest } from "$lib/utils/request";
import { json, type RequestHandler } from "@sveltejs/kit";
import { sessionRepo } from "$lib/db/session.repo";

export const GET: RequestHandler = async ({ request}) => {
	return handleRequest(async () => {
		const  token = request.headers.get('authentication');
		if (typeof token !== 'string') throw new RequestError(403, 'not authenticated');
		return json(await getConnections(token));;
	});
};

export async function getConnections(token: any) {
	await authGuard(token, ['admin']);
	return sessionRepo.getAll();
}