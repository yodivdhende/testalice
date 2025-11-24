<script lang='ts'>
  let {value = $bindable()}:{value: number} = $props();
  let max = 10;
</script>
<main>
  <button onclick={() => value--}>-</button>
  <div class="value">{value} / {max}</div>
  <button onclick={() => value++}>+</button>
</main>
<style>
  main {
    display: flex;
    width: 100%;
  }
</style>