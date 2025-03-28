import { characterRepo } from "$lib/db/character.repo.svelte";
import { type RequestHandler, json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({url}) => {
    const id = url.searchParams.get('id');
    if(id == null || typeof id != 'string') return json([]);
    const idNumber = parseInt(id);
    if(Number.isNaN(idNumber)) return json([]);
    return json(await characterRepo.getById(idNumber));
}