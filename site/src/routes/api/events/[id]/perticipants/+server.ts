import { eventRepo, isLarpEvent } from '$lib/db/event.repo';
import { eventParticipantsRepo, isEventParticapant } from '$lib/db/event_participants.repo';
import { isNumberOrError } from '$lib/request.utils';
import { BadRequest, RequestError } from '$lib/types/errors';
import { getSessionToken } from '$lib/utils/cookies';
import { authGuard, authGuardForUser, handleRequest } from '$lib/utils/request';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies, params }) => {
	return handleRequest(async () => {
		await authGuardForUser(getSessionToken(cookies), ['admin']);
        const { id} = params;
		const numberId = isNumberOrError(id);
		return json(await eventParticipantsRepo.getPerticipants({eventId: numberId}));
	});
};

export const PUT: RequestHandler = async ({ cookies, request }) => {
	return handleRequest(async () => {
		await authGuard(getSessionToken(cookies), ['admin']);
		const body = await request.json();
		if (isEventParticapant(body) == false) throw new BadRequest();
		eventParticipantsRepo.participate(body);
		return new Response();
	});
};

export const DELETE: RequestHandler = async ({ cookies, request }) => {
	return handleRequest(async () => {
		await authGuard(getSessionToken(cookies), ['admin']);
		const body = await request.json();
		if (isEventParticapant(body) == false) throw new BadRequest();
		eventParticipantsRepo.withdraw(body);
		return new Response();
	});
};


