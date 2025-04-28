import { setSessionToken } from "$lib/utils/cookies";
import type { Actions } from "@sveltejs/kit";
import { requestRegistration } from "../../api/authentication/register/+server";

export const actions = {
    default: async ({cookies, request}) => {
        const formData = await request.formData();
        const name= formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const {token} = await requestRegistration({name, email, password});
        setSessionToken(cookies, token);
    }
} satisfies Actions