import type { Skill } from "$lib/db/skills.repo";
import { handleRequest } from "$lib/utils/request";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { characterVersionRepo, type CharacterVerionSkill } from "$lib/db/character_version.repo";

export const load: PageServerLoad = async ({fetch, parent}) => {
  return handleRequest(async () => {
    const skills: Skill[] = (await (await fetch('/api/skills', {method: 'GET'})).json())?? [];
    const {characterVersion} = await parent();
    return {
      skills,
      characterSkills: characterVersion?.skills ?? [],
      characterVerionId: characterVersion?.id,
    }
  })
}

export const actions: Actions = {
  default: async ({request}) => {
    const data = await request.formData();
    const skillJson = data.get('skills');
    const versionIdJson = data.get('characterVersionId');
    if(versionIdJson == null || typeof versionIdJson != 'string') return;
    if(skillJson == null || typeof skillJson != 'string') return;
    const skills: CharacterVerionSkill[] = await JSON.parse(skillJson);
    const versionId = Number(versionIdJson);
    await characterVersionRepo.saveSkills({
      versionId: versionId,
      skills
    })
  }
  
}