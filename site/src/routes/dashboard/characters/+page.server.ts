import {error} from '@sveltejs/kit'
import { characterRepo } from "$lib/db/character.repo.svelte"
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () =>{
    try {
        return {
            characters: await characterRepo.getAll(),
        }
    }
    catch(err) {
       error(500) ;
    }
} 