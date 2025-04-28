import { setSessionToken } from "$lib/utils/cookies";
import type { Actions } from "@sveltejs/kit";
import { requestRegistration } from "../../api/authentication/register/+server";
import { getUserOfToken } from "../../api/users/active/+server";

export const actions = {
    default: async ({cookies, request}) => {
        try{
        const formData = await request.formData();
        const name= formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const {token, roles} = await requestRegistration({name, email, password});
        const activeUser = await getUserOfToken(token);
        setSessionToken(cookies, token);
        return {success: {
                activeUser,
                roles,
            }};
        } catch (err){
            return {error: err}
        }
    }
} satisfies Actions