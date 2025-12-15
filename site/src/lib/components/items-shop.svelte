<script lang='ts'>
	import { CircleMinus, PlusCircle } from "@lucide/svelte";
	import type { Item } from "$lib/db/items.repo";
	import type { CharacterVersionItem } from "$lib/db/character_version.repo";
  
  let {items, characterItems=$bindable()}: {items: Item[], characterItems: CharacterVersionItem[]}= $props();
  let basketItems: (Item & {count: number})[] = $state([]);
  let newCharacterItems: CharacterVersionItem[] = $derived(basketItems.map(item=>{
    if(item.id == null) return null;
    if(item.count <= 0) return null;
    return {id: item.id, count: item.count}
  }).filter(item => item != null));

  $effect(()=> {
    if(items){
      basketItems = items.map(item => ({...item, count: 0}))
    }
  })

  $effect(()=> {
    characterItems = newCharacterItems
  });

  function remove(item: {count: number}){
    if(item.count === 0) return;
    item.count--;
  }

</script>
<main>
  <h1>Items shop</h1>
  <div class="grid">
    {#each basketItems as item}
      <div class="items">
        <img src="https://picsum.photos/200/200"  alt="random" />
        <div>{item.name}</div>
        <button onclick={()=>remove(item)}><CircleMinus/></button>
        <input type=number  bind:value={item.count} />
        <button onclick={()=>item.count++}><PlusCircle /></button>
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
      'image image image'
      'name name name'
      'remove value add';
  }
  .items img {
    grid-area: image;
  }
  .items div{
    grid-area: name;
    width: 100%;
    text-align: center;
  }
  .items button:last-child{
    grid-area: add;
  }

  .items input {
    grid-area: value;
  }

  .items button:first-child{
    grid-area: remove;
  }

</style>