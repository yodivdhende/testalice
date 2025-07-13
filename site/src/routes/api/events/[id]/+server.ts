import { eventRepo } from '$lib/db/event.repo';
import { isNumberOrError } from '$lib/request.utils';
import { getSessionToken } from '$lib/utils/cookies';
import { authGuard, handleRequest } from '$lib/utils/request';
import { type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ cookies, params}) => {
	return handleRequest(async () => {
		await authGuard(getSessionToken(cookies), ['admin']);
		const { id } = params;
		const numberId = isNumberOrError(id);
        eventRepo.delete({id: numberId});
		return new Response();
	});
};

