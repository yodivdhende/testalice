import { error } from "console";
import { characterRepo } from "$lib/db/character.repo.svelte";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
    const id = params.id;
    console.log(id);
    if(id == null || typeof id != 'string') return error(404, 'Not found!');
    const idNumber = parseInt(id);
    if(Number.isNaN(idNumber)) return error(404, 'Not found!');
    const character = await characterRepo.getById(idNumber);
    console.log(character);
    return {
        character,
    }
}      