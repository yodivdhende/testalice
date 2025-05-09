import { authenticationRepo } from '$lib/db/authentication.repo';
import { sessionRepo } from '$lib/db/session.repo';
import { RequestError, UnAutherizedRequestError } from '$lib/types/errors';
import { handleRequest } from '$lib/utils/request';
import { getTommorow } from '$lib/utils/time';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	return handleRequest(async () => {
		const { email, password } = await request.json();
		if (typeof email !== 'string' && typeof password !== 'string') {
			throw new RequestError(400, 'needs email and password');
		}
		const { roles, userId } = (await authenticationRepo.getCredentials({ email, password })) ?? {};
		if (roles == null) throw new UnAutherizedRequestError();
		if (userId == null) throw new UnAutherizedRequestError();
		const token = await sessionRepo.create({
			userId,
			roles,
			endDate: getTommorow(),
			descripiton: 'api login'
		});
		return json({ token, roles });
	});
};
