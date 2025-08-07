import { isSkill, skillRepo } from '$lib/db/skills.repo';
import { isNumberOrError } from '$lib/request.utils';
import { BadRequest, NotFoundRequest } from '$lib/types/errors';
import { getSessionToken } from '$lib/utils/cookies';
import { authGuard, authGuardForUser, handleRequest } from '$lib/utils/request';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, params }) => {
	return handleRequest(async () => {
		await authGuardForUser(getSessionToken(cookies), ['admin']);
		const { id } = params;
		const numberId = isNumberOrError(id);
		const skill = await skillRepo.getWithId(numberId);
		if (skill == null) throw new NotFoundRequest();
		return json(skill);
	});
};

export const DELETE: RequestHandler = async ({ cookies, params }) => {
	return handleRequest(async () => {
		await authGuard(getSessionToken(cookies), ['admin']);
		const { id } = params;
		const numberId = isNumberOrError(id);
		skillRepo.delete({ id: numberId });
		return new Response();
	});
};

export const POST: RequestHandler = async ({ cookies, params, request }) => {
	return handleRequest(async () => {
		await authGuard(getSessionToken(cookies), ['admin']);
		const { id } = params;
		isNumberOrError(id);
		const item = await request.json();
		if (isSkill(item) === false) throw new BadRequest();
		skillRepo.save(item);
		return new Response();
	});
};
