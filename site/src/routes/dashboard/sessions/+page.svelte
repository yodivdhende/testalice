<script lang="ts">
	import SessionRow from '../../../lib/components/session-row.svelte';
	import { type PageProps } from './$types';

	let { data }: PageProps = $props();

</script>

<main>
	<a href="sessions/new">+ add</a>
	<table>
		<thead>
			<tr>
				<th>Token</th>
				<th>Connection</th>
				<th>Roles</th>
				<th>Start</th>
				<th>End</th>
				<th>Description</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#if data.sessions}
				{#each data.sessions as session}
				<SessionRow {session} />
				{/each}
			{/if}
		</tbody>
	</table>
</main>

<style>
	main {
		padding: 16px;
		background-color: white;
	}
	table {
		max-width: 90vw;
	}
	tr {
		border-bottom: 1px solid silver;
	}
</style>
