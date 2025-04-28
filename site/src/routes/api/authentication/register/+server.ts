import { authenticationRepo } from '$lib/db/authentication.repo';
import { sessionRepo } from '$lib/db/session.repo';
import { RequestError } from '$lib/types/errors';
import { setSessionToken as setSessionToken } from '$lib/utils/cookies';
import { handleRequest } from '$lib/utils/request';
import { getTommorow } from '$lib/utils/time';
import { type RequestHandler, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	return handleRequest(async () => {
		const {token} = await requestRegistration(await request.json());
		setSessionToken(cookies, token);
		return new Response();
	});
};

export async function requestRegistration({
	name,
	email,
	password
}: {
	name?: any;
	email?: any;
	password?: any;
}) {
	if (typeof name === 'string' && typeof email === 'string' && typeof password === 'string') {
		await authenticationRepo.register({ name, email, password });
		const {userId, roles}= await authenticationRepo.getCredentials({ email, password }) ?? {};
		if (roles == null) throw new RequestError(400, 'credentials wrong');
		const token = await sessionRepo.create({
			userId: userId ?? null,
			roles,
			endDate: getTommorow(),
			descripiton: 'api login'
		});
		return { token };
	}
	throw new RequestError(400, 'request needs: name, email and password');
}
