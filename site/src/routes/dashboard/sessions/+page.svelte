<script lang="ts">
	import { browser } from '$app/environment';
	import type { SessionInfo } from '../../../../websocket-server/dashbord-socket';
	import SessionRow from '../../../lib/components/session-row.svelte';
	import { type PageProps } from './$types';

	let { data }: PageProps = $props();
	let sessionToken: string | undefined = $derived(data.sessionToken);
	let connections: { type: 'Web'; token: string }[] = $state([]);

	if (browser) {
		const webSocket = new WebSocket('ws://localhost:5173/dashboard');
		webSocket.onopen = () => {
			if (sessionToken != null) {
				webSocket.send(
					JSON.stringify({ sessionToken: sessionToken, connectionType: 'Web' } as SessionInfo)
				);
			}
			webSocket.onmessage = (event) => {
				const connections = JSON.parse(event.data);
				console.log(`%c ws message`, `background:white;color:black`, connections);
			}

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
					<SessionRow
						{session}
						connection={connections.find((connection) => connection.token === session.token)}
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
