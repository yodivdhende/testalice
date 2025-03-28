<script lang="ts">
	import { type PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main>
	<table>
		<thead>
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Player</th>
				<th>HP</th>
			</tr>
		</thead>
        <tbody>
            {#each data.characters as character}
                <tr>
                    <td>{character.id}</td>
                    <td>{character.name}</td>
                    <td>{character.ownerName}</td>
                    <td>{character.currentHp}/{character.maxHp}</td>
                </tr>
            {/each}
        </tbody>
	</table>
</main>

<style>
    table {
        background-color: white;
    }
</style>
