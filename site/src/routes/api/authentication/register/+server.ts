import { authenticationRepo } from '$lib/db/authentication.repo';
import { connectionRepo } from '$lib/db/connection.repo';
import { RequestError } from '$lib/types/errors';
import { handleRequest } from '$lib/utils/request';
import { getTommorow } from '$lib/utils/time';
import { type RequestHandler, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	return handleRequest(async () => {
		await requestRegistration(await request.json());
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
		const roles = await authenticationRepo.getRoles({ email, password });
		if (roles === null) return error(400, 'credentials wrong');
		const token = await connectionRepo.create({
			roles,
			endDate: getTommorow(),
			descripiton: 'api login'
		});
		return { token };
	}
	throw new RequestError(400, 'request needs: name, email and password');
}
