<script lang="ts">
	import { Canvas } from '@threlte/core';
	import PromoAnimation from '$lib/assets/gltf/promo-animation.svelte';
	import code from '$lib/assets/data/code.json';

	const targetDate = new Date('2026-03-1');
	let timeLeft = $state();
	let showInput = $state(false);
	let leftCode = $state(code.join('\n'));
	let codeIndex = 0;
	let characterIndex = -1;
	let textArea: HTMLTextAreaElement;

	setInterval(() => {
		timeLeft = getTimeLeft();
	}, 1000);

	setInterval(() => {
		leftCode = updateCode();
	}, 10);

	$effect(()=> {
		if(leftCode) {
			textArea.scrollTop = textArea.scrollHeight;
		}
	})

	function getTimeLeft() {
		const now = new Date();
		const difference = Math.floor((targetDate.getTime() - now.getTime() )/ 1000);
		return difference;
	}

	function updateCode() {
		characterIndex ++;
		let nextLine = '';
		if(characterIndex >= code[codeIndex].length){
			characterIndex = 0;
			codeIndex ++;
			nextLine = '\n';
		} 
		if(codeIndex >= code.length) {
			codeIndex = 0;
			leftCode = code.join('\n');
		}
		return leftCode + nextLine + code[codeIndex].slice(characterIndex, characterIndex +1);
	}

</script>

<main>
	<div class="background">
		<Canvas>
			<PromoAnimation />
		</Canvas>
	</div>
	<div class="code-left">
		<textarea bind:this={textArea}>{leftCode}</textarea>
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
		color: #00ff00;
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
	textarea {
		width: 100%;
		height: 90%;
		background-color: black;
		color: #005500;
		border: none;
		resize: none;
		font-family: 'Courier New', Courier, monospace;
		font-size: 1rem;
		overflow: hidden;
	}

	.code-right {
		grid-area: code-right;
	}
</style>
