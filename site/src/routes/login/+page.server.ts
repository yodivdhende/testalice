import type { Actions } from "@sveltejs/kit";
import { requestConnectionTokenAndRole } from "../api/authentication/login/+server";
import { setSessionToken } from "$lib/utils/cookies";
import { getUserOfToken } from "../api/users/active/+server";

export const actions = {
    default: async ({cookies,request}) => {
        try{
            const formdata = await request.formData();
            const email = formdata.get('email');
            const password = formdata.get('password');
            const {token}= await requestConnectionTokenAndRole({email,password})
            const activeUser = await getUserOfToken(token);
            setSessionToken(cookies, token);
            return {success: activeUser};
        } catch (err){
            return {error: err}
        }
    }
} satisfies Actions