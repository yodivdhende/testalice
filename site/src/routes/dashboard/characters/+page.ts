import type { PageLoad } from './$types';

export const load: PageLoad= async ({fetch}) =>{
    const charactersRespone = await fetch('/api/characters');
    return { characters: await charactersRespone.json() };
} 