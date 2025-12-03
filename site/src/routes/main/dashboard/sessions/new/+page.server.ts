import { UserRoundIcon } from "@lucide/svelte";
import type { Actions } from "@sveltejs/kit";


export const actions = {
    default: async ({request, fetch}) => {
        try {
            const formData = await request.formData();
            const end = formData.get('end'); //TODO: add check to see if we have a date
            const description = formData.get('description');
            const roles = formData.get('roles'); //TODO: check why only one value is emitted

            const response = await fetch('/api/sessions', {
               method: 'POST', body: JSON.stringify({
                userId: null,
                end: null,
                description,
                roles: [roles],
            }),
            }) 
            if(response.ok){
                const token = await response.json();
                return {success: {token }};
            } 
            return {error: await response.json()}
        } catch (err) {
            return {error: err}
        }
    }
} satisfies Actions;