import type { PageServerLoad } from './$types';
import { handleRequest } from '$lib/utils/request';
import { getConnectionToken } from '$lib/utils/cookies';
import { getCharactersForToken } from '../../api/characters/+server';

export const load: PageServerLoad = async ({cookies}) =>{
    return handleRequest(async () => {
        const token = getConnectionToken(cookies);
        const characters= await getCharactersForToken(token);
        return { characters};
    })
} 