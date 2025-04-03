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
                    <td><a href="characters/{character.id}">{character.id}</a></td>
                    <td>{character.name}</td>
                    <td>{character.ownerName}</td>
                    <td>{character.currentHp}/{character.maxHp}</td>
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
