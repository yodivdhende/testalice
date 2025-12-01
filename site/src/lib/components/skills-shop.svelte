<script lang="ts">
	import SkillSlider from '$lib/components/skill-slider.svelte';
	import { createNewCharacterVersionSkillGroup, groupSkills } from '$lib/utils/skills';
	import { ShoppingBag } from '@lucide/svelte';
	import type { CharacterVerionSkill } from '$lib/db/character_version.repo';
	import type { Skill } from '$lib/db/skills.repo';

	let { skills, characterSkills=$bindable()}: {skills: Skill[], characterSkills: CharacterVerionSkill[]}= $props();
	let currentCharacterSkillsGrouped = $state(createNewCharacterVersionSkillGroup(skills));
	let groups = $derived(groupSkills(skills));

	$effect(() => {
		characterSkills.forEach((skill) => {
			Object.values(currentCharacterSkillsGrouped).forEach((group) => {
				if (group.skills[skill.id] == null) return;
				group.skills[skill.id].value = skill.value;
			});
		});
	});

	$effect(() => {
		Object.values(currentCharacterSkillsGrouped).forEach((group) => {
			group.total = Object.values(group.skills).reduce((total, skill) => total + skill.value, 0);
		});
	});

	function saveSkills() {
		const skills: CharacterVerionSkill[] = Object.values(currentCharacterSkillsGrouped).flatMap(
			({ skills }) =>
				Object.entries(skills)
					.filter(([_, skill]) => skill.value > 0)
					.map(([key, skill]) => ({ id: Number(key), value: skill.value }))
		);
    characterSkills = skills;
	}
</script>

<h1>Skill shop</h1>
{#each groups as group}
	<h2>{group.name}: {currentCharacterSkillsGrouped[group.id].total}</h2>
	{#each group.skills as skill}
		<div class="skill">
			<p>{skill.name}</p>
			{#if skill.id}
				<SkillSlider bind:value={currentCharacterSkillsGrouped[group.id].skills[skill.id].value} />
			{/if}
		</div>
	{/each}
{/each}
<button onclick={saveSkills}><ShoppingBag /></button>

<style>
	h1 {
		font-size: 1.5rem;
	}
	.skill {
		padding-left: 1em;
	}
</style>
