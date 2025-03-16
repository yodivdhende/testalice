<script lang="ts">
  let showPassword = $state(false);
  let passwordInputType = $derived.by(() => showPassword ? 'text' : 'password')
</script>
<main>
  <div class="login-container">
    <h1>Login</h1>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" />
    <label for="password">Password</label>
    <input type={passwordInputType} name="password" id="password">
    {#if showPassword}
      <span class="eye__closed">◎</span>
    {:else}
      <span class="eye__open">◉</span>
    {/if}
  </div>
</main>
<style>
</style>