import type { LarpEvent } from "$lib/db/event.repo";
import type { PageLoad } from "../characters/$types";

export const load: PageLoad = async ({fetch}) => {
    const eventsRequest = await fetch('/api/events/open');
    const events:LarpEvent[]= await eventsRequest.json();
    return {events };
} 