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
		<a href="/dashboard/users">users</a>
	{/if}
	{#if roles.includes('user')}
		<a href="/dashboard/characters">Characters</a>
	{/if}
	{#if roles.includes('admin')}
		<a href="/dashboard/sessions">Sessions</a>
	{/if}
</nav>

<style>
	a {
		color: white;
		text-decoration: none;
	}
</style>
