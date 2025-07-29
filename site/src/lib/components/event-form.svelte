<script lang='ts'>
	import type { LarpEvent } from "$lib/db/event.repo";
	import { dateToHTMLDateTime } from "$lib/utils/time";

    let {event = $bindable<LarpEvent>()}: {event: LarpEvent} = $props();
    let startDate = $derived(dateToHTMLDateTime(event.start));
    let endDate = $derived(dateToHTMLDateTime(event.end));
</script>
<main>
		<label for="name">name</label>
		<input id="name" type="text" bind:value={event.name} />
		<label for="start">start</label>
		<input type="datetime-local" bind:value={
			() => startDate,
			(value)=> event.start = new Date(value)
		} />
		<label for="end">end</label>
		<input type="datetime-local" bind:value={
			() => endDate,
			(value)=> event.end = new Date(value)
} />
</main>
<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>