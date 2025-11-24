<script lang='ts'>
	import { PlusCircle, Trash } from "@lucide/svelte";
	import type { PageProps } from "./$types";
	import type { Item } from "$lib/db/items.repo";
  
  let {data}: PageProps = $props();
  let items: Item[] = data.items;

</script>
<main>
  <h1>items shop</h1>
  <div class="grid">
    {#each items as item}
      <div class="items">
        <img src="https://picsum.photos/200/200"  alt="random" />
        <div>{item.name}</div>
        <button><PlusCircle /></button>
        <button><Trash /></button>
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