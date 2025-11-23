import { characterVersionRepo } from "$lib/db/character_version.repo";
import { eventParticipantsRepo } from "$lib/db/event_participants.repo";
import { isNumberOrError } from "$lib/request.utils";
import { UserRole } from "$lib/types/roles";
import { getSessionToken } from "$lib/utils/cookies";
import { authGuardForUser, handleRequest } from "$lib/utils/request";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({cookies, params}) => { 
  return handleRequest(async ()=>{
    await authGuardForUser(getSessionToken(cookies), [UserRole.user]);
    const characterId = isNumberOrError(params.characterId);
    const event = isNumberOrError(params.eventId);

    const participent = await eventParticipantsRepo.getPerticipant({eventId: event, characterId: characterId});
    if(participent?.characterVerion == null) return { characterVersion: undefined};

    const characterVersion = await characterVersionRepo.getWithId(participent.characterVerion); 
    return { characterVersion }
  })
}
