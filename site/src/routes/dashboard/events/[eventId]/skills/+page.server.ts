import type { Skill } from "$lib/db/skills.repo";
import { handleRequest } from "$lib/utils/request";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { CharacterVersionBare } from "$lib/db/character_version.repo";

export const load: PageServerLoad = async ({fetch, parent}) => {
  return handleRequest(async () => {
    const skills: Skill[] = (await (await fetch('/api/skills', {method: 'GET'})).json())?? [];
    const {characterVersion}: {characterVersion: CharacterVersionBare} = await parent();
    return {
      skills,
      characterSkills: characterVersion.skills,
    }
  })
}

export const actions: Actions = {
  default: async ({request}) => {
    const data = await request.formData();
    const skillJson = data.get('skills');
    if(skillJson == null) return;
    const skills = JSON.parse(skillJson as string);
    await fetch(`/api/character/`)
  }
  
}