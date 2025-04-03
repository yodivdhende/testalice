import { characterRepo, isCharacter } from "$lib/db/character.repo.svelte";
import { type RequestHandler, json } from "@sveltejs/kit";
import { error } from "console";

export const GET: RequestHandler = async ({params}) => {
    const id = params.id;
    if(id == null || typeof id != 'string') return json([]);
    const idNumber = parseInt(id);
    if(Number.isNaN(idNumber)) return json([]);
    return json(await characterRepo.getById(idNumber));
}

export const POST: RequestHandler = async ({request}) => {
    const character= await request.json();
    if(isCharacter(character)) {
        await characterRepo.save(character);
        return json(await characterRepo.getById(character.id));
    }
    return error(400, "body was not of type character");
}