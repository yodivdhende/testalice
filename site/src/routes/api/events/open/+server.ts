import { eventRepo } from "$lib/db/event.repo";
import { EventStatus } from "$lib/types/event-status";
import { getSessionToken } from "$lib/utils/cookies";
import { authGuardForUser, handleRequest } from "$lib/utils/request"
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies }) => {
  return handleRequest(async () => {
    await authGuardForUser(getSessionToken(cookies), ['admin', 'user']);
    return json(await eventRepo.getWithStatus(EventStatus.Open));
  });
}
  
