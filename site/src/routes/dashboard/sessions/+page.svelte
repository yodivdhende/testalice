<script lang="ts">
	import { browser } from '$app/environment';
	import type { SessionInfo } from '../../../../websocket-server/connection-socketet';
	import SessionRow from '../../../lib/components/session-row.svelte';
	import { type PageProps } from './$types';

	let { data }: PageProps = $props();
	let sessionToken: string | undefined = $derived(data.sessionToken);
	let connections: SessionInfo[] = $state([]);

	if (browser) {
		const webSocket = new WebSocket('ws://localhost:5173/connections');
		webSocket.onopen = () => {
			if (sessionToken != null) {
				webSocket.send(
					JSON.stringify({ sessionToken: sessionToken, connectionType: 'Web' } as SessionInfo)
				);
			}
			webSocket.onmessage = (event) => connections = JSON.parse(event.data);
		};
	}
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
					<SessionRow {session} 
					 connection={connections.find(connection => connection.sessionToken === session.token)}
					 />
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
