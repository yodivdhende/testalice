<script lang='ts'>
	import { type PageProps } from './$types';

	let { data }: PageProps = $props();
	console.log(data);
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
            {#each data.connections as connection}
                <tr>
                    <td>{connection.token}</td>
                    <td>{connection.roles.join(', ')}</td>
                    <td>{connection.start}</td>
                    <td>{connection.end}</td>
                    <td>{connection.description}</td>
                    <td>{connection.description}</td>
                </tr>
            {/each}
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
    td{
        padding: 16px 8px;
    }
</style>