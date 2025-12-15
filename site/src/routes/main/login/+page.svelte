<script lang="ts">
	import { credentialStore } from '$lib/local-utils/credential-store.svelte';
	import type { PageProps } from './$types';

	let showPassword = $state(false);
	let passwordInputType = $derived.by(() => (showPassword ? 'text' : 'password'));

	let email = '';
	let password = '';

	function toggleShowPassword() {
		showPassword = !showPassword;
	}

	let { form }: PageProps = $props();
	if (form?.error) console.error(form.error);
	if (form?.success) {
		const { roles } = form.success;
		credentialStore.roles = roles;
	}
</script>

<main>
	<div class="login-container">
		<form method="POST" action="/main/login">
			<h1>Login</h1>
			<label for="email">Email</label>
			<input type="email" name="email" id="email" value={email} />
			<label for="password">Password</label>
			<div class="password">
				<input type={passwordInputType} name="password" id="password" value={password} />
				{#if showPassword}
					<button onclick={toggleShowPassword}>◎</button>
				{:else}
					<button onclick={toggleShowPassword}>◉</button>
				{/if}
			</div>
			<button> Login </button>
		</form>
		<a href="/main/login/register">Register</a>
	</div>
</main>

<style>
	main {
		display: grid;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.login-container {
		align-self: center;
		justify-self: center;
		display: grid;
		gap: 1em;
		flex-direction: column;
		width: min-content;
		height: min-content;
		padding: 2em;
		color: white;
		border: 1px solid white;
		border-radius: 5px;
	}

	.login-container form {
		display: grid;
		gap: 1em;
	}

	.password {
		display: flex;
	}
</style>
