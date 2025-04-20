<script lang="ts">
	import '../app.css';
	// import Scene from '$lib/components/scene.svelte';
	// import { Canvas } from '@threlte/core';
	import backgroundImg from '$lib/assets/images/background.png';
	let { children } = $props();
</script>

<main>
	<div class="background">
		<img src={backgroundImg} alt="backgroundImg" />
		<!-- <Canvas>
		<Scene></Scene>
	</Canvas> -->
	</div>
	<header>
		<a href="/">Home</a>
		<a href="/login">Login</a>
		<a href="/dashboard/users">Users</a>
		<a href="/dashboard/characters">Characters</a>
		<a href="/dashboard/connections">Connections</a>
	</header>
	<section>
		{@render children()}
	</section>
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
		display: flex;
		gap: 1em;
		background-color: black;
		border-bottom: 1px solid white;
		font-size: 2rem;
		padding: 1em;
	}

	a {
		color: white;
		text-decoration: none;
	}

  section {
    grid-area: section;
    width:100%;
    height: 100%;
  }
</style>
