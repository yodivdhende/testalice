<script lang='ts'>
	import type {  NewCharacter } from "$lib/db/character.repo";

    let {character = $bindable<NewCharacter>(), users} = $props();
</script>
<main>
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
		<label for="hp">max hp</label>
		<input type="number" bind:value={character.maxHp} />
</main>
<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>