<script lang='ts'>
	import SkillSlider from "$lib/components/skill-slider.svelte";
	import { groupSkills } from "$lib/utils/skills";
	import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  let skills = data.skills;
  let groups = $derived(groupSkills(skills))

  $effect( () => console.log('groups', groups));
  $effect( () => console.log('skills', skills));

</script>
<h1>Skill shop</h1>
{#each groups as group}
  <h2>{group.name}</h2>
  {#each group.skills as skill}
  <div class="skill">
    <p>{skill.name}</p>
    <SkillSlider value={0} />
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