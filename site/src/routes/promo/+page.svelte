<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PromoAnimation from '$lib/assets/gltf/promo-animation.svelte';

	const targetDate = new Date('2026-03-1');
	let timeLeft = $state();
	let showInput = $state(true);

	setInterval(() => {
		timeLeft = getTimeLeft();
	}, 1000);

	function getTimeLeft() {
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();
		return difference;
	}


</script>

<main>
	<div class="background">
		<Canvas>
			<PromoAnimation />
		</Canvas>
	</div>
	<div class="code-left">
	</div>
	<div class="title">
		TerraPrime 
	</div>
	{#if showInput}
		<div class="input">
			<input type="text" />
		</div>
	{/if}
	<div class="count-down">
		{timeLeft}
	</div>
	<div class="code-right">
	</div>
</main>

<style>
	main {
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr minmax(500px, 1fr) 1fr;
		grid-template-areas: 
			"code-left 	title				code-right"
			"code-left 	input				code-right"
			"code-left  count-down 	code-right"
		;
		background-color: black;
		color: green;
		font-family: 'Courier New', Courier, monospace;
	}

	.background {
		grid-column: 1/ -1;
		grid-row: 1/ -1;
	}

	.title {
		grid-area: title;
		align-self: end;
		z-index: 1;
		font-size: 5rem;
		font-weight: bold;
		text-align: center;
		padding: auto;
	}
	
	.input {
		grid-area: input;
		align-self: center;
		justify-self: center;
		z-index: 1;
		width:100%;
	}

	.input input{
		width: 100%;
		border: none;
		outline: none;
		text-align: center;
		color: green;
		font-size: 2rem;
		background-color: black;
	}

	.count-down {
		grid-area: count-down;
		align-self: top;
		z-index: 1;
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
	}

	.code-left {
		grid-area: code-left;
	}

	.code-right {
		grid-area: code-right;
	}
</style>
