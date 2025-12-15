<script lang="ts">
	import SkillSlider from '$lib/components/skill-slider.svelte';
	import { groupSkills } from '$lib/utils/skills.svelte';
	import type { CharacterVerionSkill } from '$lib/db/character_version.repo';
	import type { Skill } from '$lib/db/skills.repo';

	let {
		skills,
		characterSkills = $bindable()
	}: { skills: Skill[]; characterSkills: CharacterVerionSkill[] } = $props();
	let groupedSkills = groupSkills(skills);

	$effect(() => {
		characterSkills.forEach((skill) => {
			Object.values(groupedSkills).forEach((group) => group.setValueOfSkill(skill));
		});
	});

	$effect(() => {
		const skills: CharacterVerionSkill[] = Object.values(groupedSkills).flatMap(({ skills }) =>
			skills.filter(({ value }) => value > 0).map(({ id, value }) => ({ id: id ?? -1, value }))
		);
		characterSkills = skills;
	});
</script>

<h1>Skill shop</h1>
{#each groupedSkills as group}
	<h2>{group.name}: {group.total}</h2>
	{#each group.skills as skill}
		<div class="skill">
			<p>{skill.name}</p>
			<SkillSlider bind:value={skill.value} />
		</div>
	{/each}
{/each}

<style>
	h1 {
		font-size: 1.5rem;
	}
	.skill {
		padding-left: 1em;
	}
</style>
