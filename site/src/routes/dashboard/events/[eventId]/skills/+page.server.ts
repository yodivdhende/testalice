import type { Skill } from "$lib/db/skills.repo";
import { handleRequest } from "$lib/utils/request";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
  return handleRequest(async () => {
    const skills: Skill[] = (await (await fetch('/api/skills', {method: 'GET'})).json())?? [];
    return { skills }
  })
}