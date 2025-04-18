import { RequestError } from "$lib/types/errors";
import { error, type HttpError } from "@sveltejs/kit";

export async function handleRequest<T>(cb: () => Promise<T>) {
    try {
        return await cb();
    } catch (err) {
        if(err instanceof RequestError) return err.getError();
        return error(500, `${err}`);
    }
}