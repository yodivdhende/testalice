import type { Item } from "$lib/db/items.repo";
import { handleRequest } from "$lib/utils/request";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
  return handleRequest(async ()=>{
    const items: Item[] = await(await fetch('/api/items',{method: 'GET'})).json();
    return {
      items: items ?? [],
    }
  });
}