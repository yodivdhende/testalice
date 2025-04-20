<script lang="ts">
	import Dropdown from '$lib/components/dropdown.svelte';
	import { type PageProps } from './$types';
	import { Settings2 } from '@lucide/svelte';

	let { data }: PageProps = $props();

	async function deleteConnection(token: string) {
		const response = await fetch(`/api/connections/${token}`, {
			method: 'DELETE'
		});
		console.log(response);
	}
</script>

<main>
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
			{#if data.connections}
				{#each data.connections as connection}
					<tr>
						<td>{connection.token}</td>
						<td>{connection.roles.join(', ')}</td>
						<td>{connection.start}</td>
						<td>{connection.end}</td>
						<td>{connection.description}</td>
						<td>
							<Dropdown {button} {content} />
							{#snippet button()}
								<Settings2 />
							{/snippet}
							{#snippet content()}
								<ul class="options">
									<li><button>edit</button></li>
									<li><button onclick={() => deleteConnection(connection.token)}>delete</button></li>
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
