import { UnAutherizedRequestError } from "$lib/types/errors";
import type { Cookies } from "@sveltejs/kit";
import { getTommorow } from "./time";

export function setConnectionToken(cookies: Cookies, token: string) {
    cookies.set('connectionToken',token, {
        path: '/',
        maxAge: getTommorow().getTime()/1000,
        sameSite: 'strict',
    });
}

export function getConnectionToken(cookies: Cookies) {
    const token = cookies.get('connectionToken');
    if(token == null) throw new UnAutherizedRequestError(); 
    return token;
}

export function getPotentialConnectionToken(cookies: Cookies){
    return cookies.get('connectionToken');
}