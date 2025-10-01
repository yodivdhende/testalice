import { characterRepo } from "$lib/db/character.repo";
import { itemRepo } from "$lib/db/items.repo";
import { isNumberOrError } from "$lib/request.utils";
import { UserRole } from "$lib/types/roles";
import { getSessionToken } from "$lib/utils/cookies";
import { authGuardForUser, handleRequest } from "$lib/utils/request";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies, params}) => { 
  return handleRequest(async ()=>{
    await authGuardForUser(getSessionToken(cookies), [UserRole.user]);
    const characterId = isNumberOrError(params.id);
    const event = isNumberOrError(params.eventId);
    const character = characterRepo.getById(characterId);
    const items = itemRepo.getForCharacter(characterId);
  })
}
