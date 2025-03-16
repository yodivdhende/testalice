<script lang="ts">
  import Scene from '$lib/components/scene.svelte';
  import {Canvas} from '@threlte/core';
</script>

<Canvas>
    <Scene> </Scene>
</Canvas>

{@render children()}