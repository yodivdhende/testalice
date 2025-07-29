<script lang="ts">
	import { goto } from '$app/navigation';
	import EventForm from '$lib/components/event-form.svelte';
	import type { PageProps } from './$types';
	import type { LarpEvent } from '$lib/db/event.repo';

	let { data }: PageProps = $props();
	let event: LarpEvent | null = $state(null);
	$effect(()=> {
		const {event:loadEvent} = data;
		const result: LarpEvent = {
			...loadEvent,
			start: new Date(loadEvent.start),
			end: new Date(loadEvent.end),
		}
		console.log(`%c result`, `background:yellow;color:black`, {...result});
		event = result;
	})

	async function save() {
		const eventToSave = $state.snapshot(event);
		if(eventToSave == null) return;
		const {id: eventId} = eventToSave;
		if(eventId == null) return;
		try {
		console.log(`%c event to save`, `background:lime;color:black`, {eventToSave});
		const result = await fetch(`/api/events/${eventId}`, {
			method: 'post',
			body: JSON.stringify(eventToSave),
			headers: {
				'content-type': 'application/json',
			}
		})
		if(result.ok) {
			goto('.');
		}

		} catch( err) {
			//TODO make error component;
		}
    }
</script>

<main>
	<a href=".">back</a>
	{#if event != null}
		<EventForm bind:event={ event } />
	{/if}
	<div>
		<button onclick={save}>save</button>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		padding: 8px;
		background-color: white;
	}
</style>
