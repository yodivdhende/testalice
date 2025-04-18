import { characterRepo, isCharacter, isNewCharacter } from '$lib/db/character.repo.svelte';
import { isNumberOrError } from '$lib/request.utils';
import { RequestError } from '$lib/types/errors';
import { handleRequest } from '$lib/utils/request';
import { type RequestHandler, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
    return handleRequest(async ()=> json(await getCharacter(params)));
};

export const POST: RequestHandler = async ({ request }) => {
    return handleRequest(async ()=> {
		await saveCharacter(await request.json());
		return new Response();
    });
};

export async function getCharacter({ id }: { id?: any }) {
	const numberId = isNumberOrError(id);
	return await characterRepo.getById(numberId);
}

export async function saveCharacter({ character }: { character: any }) {
	if (isCharacter(character) || isNewCharacter(character)) {
		await characterRepo.save(character);
	}
	return new RequestError(400, 'body was not of type character');
}
