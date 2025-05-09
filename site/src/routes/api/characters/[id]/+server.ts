import { characterRepo, isCharacter, isNewCharacter } from '$lib/db/character.repo';
import { isNumberOrError } from '$lib/request.utils';
import { RequestError } from '$lib/types/errors';
import { handleRequest } from '$lib/utils/request';
import { type RequestHandler, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	return handleRequest(async () => {
		const { id } = params;
		const numberId = isNumberOrError(id);
		const character = await characterRepo.getById(numberId);
		return json(character);
	});
};

export const POST: RequestHandler = async ({ request }) => {
	return handleRequest(async () => {
		const { character } = await request.json();
		if (isCharacter(character) === false && isNewCharacter(character) === false){
			throw new RequestError(400, 'body was not of type character');
		}
		await characterRepo.save(character);
		return new Response();
	});
};

