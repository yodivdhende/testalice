<script lang="ts">
	import { credentialStore } from '$lib/local-utils/credential-store.svelte';

	const roles = $derived(credentialStore.roles);
</script>

<nav>
	<a href="/">Home</a>
	{#if roles.includes('user') === false}
		<a href="/login">login</a>
	{/if}
	{#if roles.includes('user')}
		<a href="/dashboard/users">Users</a>
	{/if}
	{#if roles.includes('user')}
		<a href="/dashboard/characters">Characters</a>
	{/if}
	{#if roles.includes('admin')}
		<a href="/dashboard/sessions">Sessions</a>
	{/if}
	{#if roles.includes('admin')}
		<a href="/dashboard/events">Events</a>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		background-color: black;
		border-bottom: 1px solid white;
		font-size: 2rem;
	}
	a {
		display: block;
		padding: 1em;
		height: 100%;
		color: white;
		text-decoration: none;
		border: 1px solid white;
		border-top: none;
	}
</style>
