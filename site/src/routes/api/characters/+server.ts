import { characterRepo, isNewCharacter } from '$lib/db/character.repo';
import { BadRequest } from '$lib/types/errors';
import { getSessionToken } from '$lib/utils/cookies';
import { authGuard, authGuardForUser, handleRequest } from '$lib/utils/request';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	return handleRequest(async () => {
		const { roles, userId } = await authGuardForUser(getSessionToken(cookies), ['admin', 'user']);
		if (roles.includes('admin')) return json(await characterRepo.getAll());
		return json(await characterRepo.getForUser(userId));
	});
};

export const PUT: RequestHandler = async ({ cookies, request }) => {
	return handleRequest(async () => {
		await authGuard(getSessionToken(cookies), ['user']);
		const body = await request.json();
		if (isNewCharacter(body) == false) throw new BadRequest();
		characterRepo.save(body);
		return new Response();
	});
};

