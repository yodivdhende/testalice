import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    event.locals.user = authenticateUser(event) //TODO look at this https://www.youtube.com/watch?v=K1Tya6ovVOI&ab_channel=Huntabyte

    if (event.url.pathname.startsWith('/dashboard')) {
        if(event.locals.user == null || event.locals.user.roles.includes('Admin')  === false) {
            throw redirect(303, "/login");
        }
    }

    const response = await resolve(event);

    return response;
}