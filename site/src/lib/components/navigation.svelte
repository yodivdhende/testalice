<script lang="ts">
	import type { UserRole } from '$lib/types/roles';

	let {roles}: {roles: UserRole[]} = $props();
</script>

<nav>
	<a href="/">Home</a>
	{#if roles.includes('user') === false}
		<a href="/login">login</a>
	{/if}
	<a href="/dashboard/users">users</a>
	<a href="/dashboard/characters">Characters</a>
	{#if roles.includes('admin')}
		<a href="/login">login</a>
	{/if}
	<a href="/dashboard/connections">Connections</a>
</nav>

<style>
	a {
		color: white;
		text-decoration: none;
	}
</style>
