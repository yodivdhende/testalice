import type { Item } from "$lib/db/items.repo";
import type { PageLoad } from "../characters/$types";

export const load: PageLoad = async ({fetch}) => {
    const itemsRequest = await fetch('/api/items');
    const items: Item[]= await itemsRequest.json();
    return {items };
}