<script lang="ts">
	import { invalidate } from "$app/navigation";
	import type { LarpEvent } from "$lib/db/event.repo";
	import { sidePanelManager } from "$lib/managers/side-panel-manager.svelte";
	import EventForm from "../event-form.svelte";

    let event: LarpEvent = $state({
        id: null,
        name: '',
        start: new Date(),
        end: new Date(),
    });

   async function save(){
        const response = await fetch('/api/events', {
            method: 'put',
            body: JSON.stringify(event),
        })
        if(response.ok){
            invalidate('/api/events');
            sidePanelManager.close();
        }
    }

</script>

<main>
	<h1>edit event</h1>
	{#if event != null}
		<EventForm bind:event={event}  />
	{/if}
	<div>
		<button onclick={save}>save</button>
	</div>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
	}
</style>
