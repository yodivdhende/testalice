import type { Actions } from "@sveltejs/kit";
import { requestConnectionTokenAndRole } from "../api/authentication/login/+server";
import { setConnectionToken } from "$lib/utils/cookies";

export const actions = {
    default: async ({cookies,request}) => {
        try{
            const formdata = await request.formData();
            const email = formdata.get('email');
            const password = formdata.get('password');
            const {token}= await requestConnectionTokenAndRole({email,password})
            setConnectionToken(cookies, token);
            return {success: true};
        } catch (err){
            return {failer: err}
        }
    }
} satisfies Actions