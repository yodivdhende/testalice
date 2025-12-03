<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	
	onMount(() => {
		if(page.url.pathname === '/') {
			console.log('root layout');
			goto('/promo');
		}
	})


	let { children }: LayoutProps = $props();
</script>

{@render children()}

<style>
</style>
