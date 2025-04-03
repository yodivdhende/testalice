import { error } from "console";
import { characterRepo, type Character } from "$lib/db/character.repo.svelte";
import type { PageServerLoad } from "./$types";
import { userRepo } from "$lib/db/user.repo.svelte";

export const load: PageServerLoad = async ({params}) => {
    try {
    const character = (await getCharacter(params.id));
    if(character == null) return error(404, 'Not found!');
    return {
        character,
        users: await userRepo.getAll(),
    }

    }catch(err) {
        return error(500, err);
    }
}      



async function getCharacter(id: any): Promise<Character | undefined> {
    if(id == null || typeof id != 'string') return;
    const idNumber = parseInt(id);
    if(Number.isNaN(idNumber)) return;
    return  characterRepo.getById(idNumber);
}
