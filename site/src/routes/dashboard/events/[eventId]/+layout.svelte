<script lang="ts">
	import { goto } from '$app/navigation';
	import type { LayoutProps } from './$types';
	import type { LarpEvent } from '$lib/db/event.repo';
	import type { Character } from '$lib/db/character.repo';
	import { ArrowLeft } from '@lucide/svelte';
	import type { CharacterVersionBare } from '$lib/db/character_version.repo';
	import { page } from '$app/state';
	import type { Skill } from '$lib/db/skills.repo';
	import SkillsOverview from '$lib/components/skills-overview.svelte';

	let { data, children }: LayoutProps = $props();
	let event: LarpEvent | null = data.event;
	let characters: Character[] = data.characters;
	let skills: Skill[] = data.skills;
	let selectedCharacterId: string | null = $state(page.url.searchParams.get('character'));
	let selectedCharacterVersion: CharacterVersionBare | undefined = data.characterVerion;

	$effect(() => {
		if (selectedCharacterId == null) return;
		if (page.url.searchParams.get('character') == selectedCharacterId) return;
		goto(`?character=${selectedCharacterId}`);
	});

	async function goBack() {
		await goto('.');
	}

	function goToShop(shop: 'skills' | 'implants' | 'items') {
		goto(`/dashboard/events/${event?.id}/${shop}`);
	}
</script>

<main>
	{#if event != null}
		<div class="event-header">
			<a href=".">
				<ArrowLeft />
			</a>
			<h1>{event.name}</h1>
		</div>
		<aside>
			<label for="character-selector">Character</label>
			<select id="character-selector" bind:value={selectedCharacterId}>
				<option value={null}>-- select character --</option>
				{#each characters as character}
					<option value={character.id}>{character.name}</option>
				{/each}
			</select>
			<dl>
				<dt>
					<h2><button onclick={() => goToShop('skills')}>Skills</button></h2>
				</dt>
				<dd>
					<SkillsOverview {skills} />
				</dd>
				<dt>
					<h2><button onclick={() => goToShop('implants')}>Implants</button></h2>
				</dt>
				<dd></dd>
				<dt>
					<h2><button onclick={() => goToShop('items')}>Items</button></h2>
				</dt>
				<dd></dd>
			</dl>
		</aside>
		<section>
			{@render children()}
		</section>
		<div class="event-footer">
			<button>sign-up</button>
			<button onclick={goBack}>cancel</button>
		</div>
	{/if}
</main>

<style>
	main {
		display: grid;
		grid-template-columns: minmax(300px, 1fr) 3fr;
		grid-template-areas:
			'header header'
			'aside section'
			'footer footer';

		flex-direction: column;
		padding: 8px;
		background-color: white;
		gap: 8px;
	}

	h1 {
		font-size: 1.5em;
	}

	h2 button {
		font-size: 1.2em;
		margin: 8px 0;
		width: 100%;
	}


	.event-header {
		grid-area: header;
		display: flex;
		align-items: center;
		gap: 8px;
		border-bottom: 1px solid #ccc;
	}

	aside {
		grid-area: aside;
		border-right: 1px solid #ccc;
		padding: 8px;
	}

	section {
		grid-area: section;
		padding: 8px;
	}

	.event-footer {
		grid-area: footer;
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		border-top: 1px solid #ccc;
	}
</style>
