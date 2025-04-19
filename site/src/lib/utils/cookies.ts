import type { Cookies } from "@sveltejs/kit";

export function setConnectionToken(cookies: Cookies, token: string) {
    cookies.set('token',token, {path: '/connection'});
}