import { UnAutherizedRequestError } from "$lib/types/errors";
import type { Cookies } from "@sveltejs/kit";
import { getTommorow } from "./time";

export function setSessionToken(cookies: Cookies, token: string) {
    cookies.set('session-token',token, {
        path: '/',
        maxAge: getTommorow().getTime()/1000,
        sameSite: 'strict',
    });
}

export function getSessionToken(cookies: Cookies) {
    const token = cookies.get('session-token');
    if(token == null) throw new UnAutherizedRequestError(); 
    return token;
}

export function setPotentialSessionToken(cookies: Cookies){
    return cookies.get('session-token');
}