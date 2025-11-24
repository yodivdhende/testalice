import type { Implant } from "$lib/db/implants.repo";
import { handleRequest } from "$lib/utils/request"
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
  return handleRequest(async ()=> {
    const implants: Implant[] = await ( await fetch('/api/implants', {method: 'GET'})).json();
    return {
      implants: implants ?? []
    }
  });
}