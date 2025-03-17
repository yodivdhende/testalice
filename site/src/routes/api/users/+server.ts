import { fetchUserById } from "$lib/db/user.repo.svelte";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler  = async ({url})  => {
    const id = url.searchParams.get('id');
    if(id == null || typeof id != 'string') return json([]);
    return json(await fetchUserById({id}));
}