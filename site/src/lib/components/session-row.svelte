<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { EthernetPort, Settings2 } from '@lucide/svelte';
	import Dropdown from './dropdown.svelte';

	let { session, connection }: { session: SessionView; connection?: ConnectionView } = $props();
	let token: string | undefined = $derived(session.token);

	async function deleteConnection(token: string) {
		const response = await fetch(`/api/sessions/${token}`, {
			method: 'DELETE'
		});
		invalidate('/api/sessions');
	}

	type SessionView = {
		token?: string;
		roles?: string[];
		start?: string;
		end?: string;
		description?: string;
	};

	type ConnectionView = {
		type: 'Web';
	};
</script>

<tr>
	<td>{session.token ?? ''}</td>
	<td>
		{#if connection}
			{#if connection.type === 'Web'}
        <EthernetPort />
			{/if}
		{/if}
	</td>
	<td>{session.roles?.join(', ') ?? ''}</td>
	<td>{session.start ?? ''}</td>
	<td>{session.end ?? ''}</td>
	<td>{session.description ?? ''}</td>
	<td>
		{#if token}
			<Dropdown {button} {content} />
			{#snippet button()}
				<Settings2 />
			{/snippet}
			{#snippet content()}
				<ul class="options">
					<li><button>edit</button></li>
					<li><button onclick={() => deleteConnection(token)}>delete</button></li>
				</ul>
			{/snippet}
		{/if}
	</td>
</tr>

<style>
	tr {
		border-bottom: 1px solid silver;
	}
	td {
		padding: 16px 8px;
	}
	.options li {
		margin-top: 1em;
	}
	.options li:first-child {
		margin-top: 0;
	}
</style>
