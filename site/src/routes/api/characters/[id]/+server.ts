import { characterRepo, isCharacter, isNewCharacter } from "$lib/db/character.repo.svelte";
import { isNumberOrError } from "$lib/request.utils";
import { type RequestHandler, json } from "@sveltejs/kit";
import { error } from "console";

export const GET: RequestHandler = async ({params}) => {
    const id = isNumberOrError(params.id);
    return json(await characterRepo.getById(id));
}

export const POST: RequestHandler = async ({request}) => {
    const character= await request.json();
    if(isCharacter(character) || isNewCharacter(character)) {
        await characterRepo.save(character);
        return new Response();
    }
    return error(400, "body was not of type character");
}