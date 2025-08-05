import type { Implant } from "$lib/db/implants.repo";
import type { PageLoad } from "../characters/$types";

export const load: PageLoad = async ({fetch}) => {
    const implantsRequest = await fetch('/api/implants');
    const implants: Implant[]= await implantsRequest.json();
    return {implants };
}