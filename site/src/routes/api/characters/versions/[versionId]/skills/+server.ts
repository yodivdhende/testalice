import { characterVersionRepo, isCharacterVersionSkill } from "$lib/db/character_version.repo";
import { isSkill } from "$lib/db/skills.repo";
import { isNumberOrError } from "$lib/request.utils";
import { BadRequest } from "$lib/types/errors";
import { getSessionToken } from "$lib/utils/cookies";
import { authGuard, handleRequest } from "$lib/utils/request";
import type { RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = ({cookies,request, params}) => {
  handleRequest(async ()=>{
		await authGuard(getSessionToken(cookies), ['user']);
    const versionId = isNumberOrError(params.versionId);
    const body = request.json();
    if(Array.isArray(body) === false) throw new BadRequest();
    if(body.every(isCharacterVersionSkill) === false) throw new BadRequest();
    characterVersionRepo.saveSkills({versionId, skills: body});
  })
}
