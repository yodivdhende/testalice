<script lang='ts'>
  let {value = $bindable()}:{value: number} = $props();
  let max = 10;

  function add(event: Event) {
    event.preventDefault();
    if(value >= max)return;
    value++;
  }
  
  function reduce(event: Event){
    event.preventDefault();
    if(value <= 0)return;
    value--;
  }

</script>
<main>
  <button onclick={(e) => reduce(e)}>-</button>
  <div class="value">{value} / {max}</div>
  <button onclick={(e) => add(e)}>+</button>
</main>
<style>
  main {
    display: flex;
    width: 100%;
  }
</style>