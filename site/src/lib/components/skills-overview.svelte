<script lang="ts">
	import type { Skill } from '$lib/db/skills.repo';
	import { groupSkills } from '$lib/utils/skills';

	let { skills, values}: { skills: Skill[], values: {id: number, value: number}[] } = $props();

	let skillsGrouped = $derived(groupSkills(skills));
</script>

<dl>
	{#each skillsGrouped as group}
		<dt><h3>{group.name}</h3></dt>
		{#each group.skills as skill}
			<dd>* {skill.name}: {values.find(({id}) => id === skill.id)?.value}</dd>	
		{/each}
	{/each}
</dl>

<style>
	h3 {
		font-weight: bold;	
	}
</style>
