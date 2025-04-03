<script lang="ts">
	import { goto } from '$app/navigation';
	import CharacterForm from '$lib/components/character-form.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let character = data.character;
    const users = data.users;
	async function save() {
		if(character == null) return;
		try {
		const result = await fetch(`/api/characters/${character.id}`, {
			method: 'post',
			body: JSON.stringify(character),
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
	{#if character != null}
		<CharacterForm bind:character {users} />
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
