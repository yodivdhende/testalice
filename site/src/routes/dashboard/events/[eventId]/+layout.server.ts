import type { Character } from "$lib/db/character.repo";
import type { CharacterVersionBare } from "$lib/db/character_version.repo";
import type { LarpEvent } from "$lib/db/event.repo";
import type { Skill } from "$lib/db/skills.repo";
import { handleRequest } from "$lib/utils/request";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad= async ({ params, fetch, url}) => {
	return handleRequest(async () => {
		const [ event, characters, skills ] = await Promise.allSettled([
			getEvent({eventId: params.eventId, fetch}),
			getCharacters({fetch}),
			getSkills({fetch}),
			// getImplants(),	
			// getItems(),
		])

		const characterVerion = await getCharacterVersion({
			eventId: params.eventId,
			characterId: url.searchParams.get('character'),
			fetch,
		})

	
		return {
			event: event.status === 'fulfilled' ? event.value : null,
			characters: characters.status === 'fulfilled' ? characters.value : [],
			skills: skills.status === 'fulfilled' ? skills.value : [],
			// implants: implants.status === 'fulfilled' ? implants.value : [],
			// items: items.status === 'fulfilled' ? items.value : [],
			characterVerion,
		};
	});
};

async function getEvent({eventId, fetch}: {eventId: unknown, fetch: Fetch}): Promise<LarpEvent | null> {
		if (eventId == null || typeof eventId != 'string') return null;
		return  await (await fetch(`/api/events/${eventId}`,{ method: 'GET' })).json();
}

async function getCharacters({fetch}: {fetch: Fetch}): Promise<Character[]> {
	return (await fetch(`/api/characters`,{ method: 'GET' })).json() ?? [];
}

// async function getItems({fetch}: {fetch: Fetch}): Promise<Item[]> {
// 		return  (await fetch(`/api/items`,{method: 'GET'})).json() ?? [];
// }

// async function getImplants({fetch}: {fetch: Fetch}): Promise<Implant[]> {
// 		return  (await fetch(`/api/implants`,{method: 'GET'})).json() ?? [];
// }
 
async function getSkills({fetch}: {fetch: Fetch}): Promise<Skill[]> {
		return (await fetch(`/api/skills/groups`,{method: 'GET'})).json() ?? [];
}

async function getCharacterVersion({characterId, eventId, fetch}: {characterId: unknown, eventId: unknown, fetch: Fetch}): Promise<CharacterVersionBare | undefined>{
	if(characterId == null || typeof characterId != 'string') return undefined;
	if(eventId == null || typeof eventId != 'string') return undefined;
  return (await fetch(`/api/characters/${characterId}/events/${eventId}`,{ method: 'GET' })).json();  
}

type Fetch = {
    (input: URL | RequestInfo, init?: RequestInit): Promise<Response>;
    (input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
}