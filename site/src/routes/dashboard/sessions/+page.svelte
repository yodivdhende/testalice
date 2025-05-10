<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Dropdown from '$lib/components/dropdown.svelte';
	import { type PageProps } from './$types';
	import { Settings2 } from '@lucide/svelte';

	let { data }: PageProps = $props();

	async function deleteConnection(token: string) {
		const response = await fetch(`/api/sessions/${token}`, {
			method: 'DELETE'
		});
		invalidate('/api/sessions');
	}
</script>

<main>
	<a href="sessions/new">+ add</a>
	<table>
		<thead>
			<tr>
				<th>Token</th>
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
					<tr>
						<td>{session.token}</td>
						<td>{session.roles.join(', ')}</td>
						<td>{session.start}</td>
						<td>{session.end}</td>
						<td>{session.description}</td>
						<td>
							<Dropdown {button} {content} />
							{#snippet button()}
								<Settings2 />
							{/snippet}
							{#snippet content()}
								<ul class="options">
									<li><button>edit</button></li>
									<li><button onclick={() => deleteConnection(session.token)}>delete</button></li>
								</ul>
							{/snippet}
						</td>
					</tr>
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
