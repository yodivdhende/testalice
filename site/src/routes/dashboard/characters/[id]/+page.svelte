<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let character = data.character;
    let users = data.users;
	function save() {
    }
</script>

<main>
	{#if character != null}
		<label for="owner">owner</label>
        {#if users != null}
        <select id="owner" bind:value={character.ownerId}>
            {#each users as owner}
                <option value={owner.id}>{owner.name}</option> 
            {/each}
        </select>
        {/if}
		<label for="name">name</label>
		<input id="name" type="text" bind:value={character.name} />
		<label for="hp">hp</label>
		<input type="number" bind:value={character.maxHp} />
		<div>
			<button onclick={save}>save</button>
		</div>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		background-color: white;
		gap: 8px;
		padding: 8px;
	}
</style>
