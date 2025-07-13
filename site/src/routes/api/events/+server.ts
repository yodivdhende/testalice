import { eventRepo, isLarpEvent } from '$lib/db/event.repo';
import { BadRequest, RequestError } from '$lib/types/errors';
import { getSessionToken } from '$lib/utils/cookies';
import { authGuard, authGuardForUser, handleRequest } from '$lib/utils/request';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, params }) => {
	return handleRequest(async () => {
		await authGuardForUser(getSessionToken(cookies), ['admin']);
        const { characterid } = params;
        if(characterid) return getEventsForCharacter(characterid);
		return json(await eventRepo.getAll());
	});
};

export const PUT: RequestHandler = async ({ cookies, request }) => {
	return handleRequest(async () => {
		await authGuard(getSessionToken(cookies), ['admin']);
		const body = await request.json();
		if (isLarpEvent(body) == false) throw new BadRequest();
		eventRepo.save(body);
		return new Response();
	});
};

function getEventsForCharacter(characterid: unknown): Response {
    if(typeof characterid !== 'number') throw new RequestError(400, 'charaterId need to be a number');
    return json(await eventRepo.getForCharacter({characterId: characterid}));

}

