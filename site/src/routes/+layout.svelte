<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import dhvtLogo from '$lib/assets/images/DEF_Logo_rgb_wit.png';
	
	onMount(() => {
		if(page.url.pathname === '/') {
			goto('/promo');
		}
	})


	let { children }: LayoutProps = $props();
</script>

{@render children()}
<div class="dhvt-logo">
	powered by <img src="{dhvtLogo}" alt="DHVT Logo" />
</div>

<style>
	.dhvt-logo {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 10;
		color:white;
		text-align: center;
	}

	.dhvt-logo img{
		width: 4rem;
	}
</style>
