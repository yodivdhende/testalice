<script lang="ts">
	import SkillSlider from '$lib/components/skill-slider.svelte';
	import { createNewCharacterVersionSkillGroup, groupSkills } from '$lib/utils/skills';
	import { ShoppingBag } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { enhance } from '$app/forms';

	let { data }: PageProps = $props();
	let skills = data.skills;
	let characterSkills = data.characterSkills;
	let characterVersionId = data.characterVerionId;
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

  async function handleSubmit( event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}){
    const data = new FormData();
		const skills = JSON.stringify(Object.values(currentCharacterSkillsGrouped).flatMap(({ skills }) =>
			Object.entries(skills)
      .filter(([_, skill]) => skill.value > 0)
      .map(([key, skill]) => ({ id: key, value: skill.value}))
		));
    data.set('skills', skills);
		data.set('characterVersionId', JSON.stringify(characterVersionId));
    await fetch(event.currentTarget.action, {
      method: 'POST',
      body: data,
    })
  }
</script>

<h1>Skill shop</h1>
<form method="POST" use:enhance onsubmit={handleSubmit}>
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
  <button><ShoppingBag /></button>
</form>

<style>
	h1 {
		font-size: 1.5rem;
	}
	.skill {
		padding-left: 1em;
	}
</style>
