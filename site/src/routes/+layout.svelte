<script lang="ts">
	import '../app.css';
	// import Scene from '$lib/components/scene.svelte';
	// import { Canvas } from '@threlte/core';
	import backgroundImg from '$lib/assets/images/background.png';
	import Navigation from '$lib/components/navigation.svelte';
	import type { LayoutProps } from './$types';
	import { sidePanelManager} from '$lib/managers/side-panel-manager.svelte';
	import { CircleX } from '@lucide/svelte';

	let { children}: LayoutProps = $props();
</script>

<main>
	<div class="background">
		<img src={backgroundImg} alt="backgroundImg" />
		<!-- <Canvas>
		<Scene></Scene>
	</Canvas> -->
	</div>
	<header>
		<Navigation />
	</header>
	<section>
		{@render children()}
	</section>
	{#if sidePanelManager.component != null}
		<div role='button' class="backdrop" onclick={()=> sidePanelManager.close()}></div>
		<aside>
			<button onclick={()=>sidePanelManager.close()}><CircleX /></button>
			<sidePanelManager.component />
		</aside>
	{/if}
</main>

<style>
  main {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-areas: 
    "header"
    "section";
    width: 100vw;
    height:100vh;
    overflow: hidden; 
  }

	.background {
    grid-column: 1 / -1;
    grid-row: 1 / -1;
	}

	img {
		width: 100%;
		height: 100%;
	}

    header {
      grid-area: header;
	}


  section {
    grid-area: section;
    width:100%;
    height: 100%;
  }

  .backdrop {
	position: absolute;
	width: 100vw;
	height: 100vh;
	z-index: 1000;
	background-color: rgba(0,0,0, 0.4);
  }
  
  aside {
	position: absolute;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: end;
	width: 600px;
	height: 100vh;
	z-index: 1010;
	background-color: white;
  }
</style>
