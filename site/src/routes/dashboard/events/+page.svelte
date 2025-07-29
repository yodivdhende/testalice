<script lang="ts">
	import { CirclePlus } from '@lucide/svelte';
	import { type PageProps } from './$types';
	import { sidePanelManager } from '$lib/managers/side-panel-manager.svelte';
	import EditEvent from '$lib/components/side-panels/edit-event.svelte';

	let { data }: PageProps = $props();
    function openNewEventPanel(){
        sidePanelManager.open(EditEvent);
    };
</script>

<main>
    <button onclick={openNewEventPanel}><CirclePlus /></button>
	<table>
		<thead>
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>start</th>
				<th>end</th>
			</tr>
		</thead>
        <tbody>
            {#each data.events as event}
                <tr>
                    <td><a href="events/{event.id}">{event.id}</a></td>
                    <td>{event.name}</td>
                    <td>{event.start}</td>
                    <td>{event.end}</td>
                </tr>
            {/each}
        </tbody>
	</table>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: end;
        gap: 8px;
        padding: 16px;
        background-color: white;
    }
    tr {
        border-bottom: 1px solid silver;
    }
    td{
        padding: 16px 8px;
    }
</style>
