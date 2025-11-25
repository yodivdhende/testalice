import type { Character } from "$lib/db/character.repo";
import type { CharacterVersionBare } from "$lib/db/character_version.repo";
import type { LarpEvent } from "$lib/db/event.repo";
import type { EventParticapant } from "$lib/db/event_participants.repo";
import type { Skill } from "$lib/db/skills.repo";
import { isNumberNullOrError, isNumberOrError } from "$lib/request.utils";
import { handleRequest } from "$lib/utils/request";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad= async ({ params, fetch, url}) => {
	return handleRequest(async () => {
		const eventId = isNumberOrError(params.eventId);
		const characterId = isNumberNullOrError(url.searchParams.get('character'));

		const [ eventResponse, charactersResponse, skillResponse ] = await Promise.allSettled([
			getEvent({eventId, fetch}),
			getCharacters({fetch}),
			getSkills({fetch}),
		])

		const characterVersion = characterId == null ? undefined : await getCharacterVersion({
			eventId, characterId, fetch,
		})

		return {
			event: getValueOfResponse(eventResponse),
			characters: getValueOfResponse(charactersResponse) ?? [],
			skills: getValueOfResponse(skillResponse) ?? [], 
			characterVersion,
		};
	});
};

function getValueOfResponse<T>(response: PromiseSettledResult<T>): T | null {
	if(response.status === 'rejected') {
		console.error(response.reason);
		return null;
	}
	return response.value;
}

async function getEvent({eventId, fetch}: {eventId: unknown, fetch: Fetch}): Promise<LarpEvent | null> {
		if (eventId == null || typeof eventId != 'number') return null;
		return  await (await fetch(`/api/events/${eventId}`,{ method: 'GET' })).json();
}

async function getCharacters({fetch}: {fetch: Fetch}): Promise<Character[]> {
	return (await fetch(`/api/characters`,{ method: 'GET' })).json() ?? [];
}
 
async function getSkills({fetch}: {fetch: Fetch}): Promise<Skill[]> {
		const skills = await (await fetch(`/api/skills`,{method: 'GET'})).json();
		return skills ?? [];
}

async function getCharacterVersion({characterId, eventId, fetch}: {characterId: number, eventId: number, fetch: Fetch}) {
  let participant: EventParticapant | undefined = await (await fetch(`/api/events/${eventId}/participants/characters/${characterId}`,{ method: 'GET' })).json();  
	if(participant == null) {
		const characterVersion = {
			id: null,
			characterId: characterId,
			name: '',
			skills: [],
			implants: [],
			items: [],
		}

		const versionId = await (await(fetch(
			`/api/characters/version`,
			{method: 'PUT', body: JSON.stringify(characterVersion)}
		))).json();
		characterVersion.id = versionId;
		return characterVersion;
	}
	const result:CharacterVersionBare = await(await fetch(`/api/characters/versions/${participant?.characterVersion}`)).json();
	return result;

}

type Fetch = {
    (input: URL | RequestInfo, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}