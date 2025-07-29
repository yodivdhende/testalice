import type { LarpEvent } from "$lib/db/event.repo";
import type { PageLoad } from "../characters/$types";

export const load: PageLoad = async ({fetch}) => {
    const events = await fetch('/api/events');
    return {events: (await events.json())as LarpEvent[]};
}