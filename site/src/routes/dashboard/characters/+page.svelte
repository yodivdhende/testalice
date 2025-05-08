<script lang="ts">
	import { CirclePlus } from '@lucide/svelte';
	import { type PageProps } from './$types';
	import { sidePanelManager } from '$lib/managers/side-panel-manager.svelte';
	import EditCharacter from '$lib/components/side-panels/edit-character.svelte';

	let { data }: PageProps = $props();
    function openNewCharacterPanel(){
        sidePanelManager.open(EditCharacter);
    };
</script>

<main>
    <button onclick={openNewCharacterPanel}><CirclePlus /></button>
	<table>
		<thead>
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Player</th>
				<th>HP</th>
			</tr>
		</thead>
        <tbody>
            {#each data.characters as character}
                <tr>
                    <td><a href="characters/{character.id}">{character.id}</a></td>
                    <td>{character.name}</td>
                    <td>{character.ownerName}</td>
                    <td>{character.currentHp}/{character.maxHp}</td>
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
