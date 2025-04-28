import { sessionRepo } from '$lib/db/session.repo';
import { RequestError } from '$lib/types/errors';
import { handleRequest } from '$lib/utils/request';
import { type RequestHandler } from '@sveltejs/kit';


export const DELETE: RequestHandler = async ({ params }) => {
	return handleRequest(async () => {
		const { token } = params;
		if (typeof token !== 'string') throw new RequestError(400, 'need prop token to be a string');
		await sessionRepo.delete(token);
		return new Response();
	});
};

