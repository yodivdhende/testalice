<script lang='ts'>
	import type { Implant } from "$lib/db/implants.repo";
	import { PlusCircle, Trash } from "@lucide/svelte";
  
  let {implants, characterImplants=$bindable()}: {implants: Implant[], characterImplants: number[]}= $props();

  function addImplant(id: number | null){
    if(id == null) return;
    if(characterImplants.includes(id)) return;
    characterImplants = [...characterImplants, id];
  }
  function removeImplant(id: number | null){
    if(id == null) return;
    if(!characterImplants.includes(id)) return;
    characterImplants = characterImplants.filter(implantId => implantId !== id);
  }
</script>

<main>
  <h1>Implants shop</h1>
  <div class="grid">
    {#each implants as implant}
      <div class="items">
        <img src="https://picsum.photos/200/200"  alt="random" />
        <div>{implant.name}</div>
        <button onclick={()=>removeImplant(implant.id)}><Trash /></button>
        <button onclick={()=>addImplant(implant.id)}><PlusCircle /></button>
      </div> 
    {/each}
  </div> 
</main>

<style>
  h1 {
    font-size: 1.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .items{
    display: grid;
    max-width: 200px;
    grid-template-areas: 
      'image image'
      'name name'
      'add delete';
  }
  .items img {
    grid-area: image;
  }
  .items div{
    grid-area: name;
    width: 100%;
    text-align: center;
  }
  .items button:first {
    grid-area: add;
  }
  .items button:last-child{
    grid-area: delete;
  }

</style>