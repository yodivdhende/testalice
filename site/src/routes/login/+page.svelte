<script lang="ts">
  let showPassword = $state(false);
  let passwordInputType = $derived.by(() => showPassword ? 'text' : 'password')

  let email = 'yodi.vandenhende@gmail.com';
  let password = 'Tester@123';

  function login(): void {
  } 

</script>
<main>
  <div class="login-container">
    <h1>Login</h1>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" value={email}/>
    <label for="password">Password</label>
    <input type={passwordInputType} name="password" id="password" value={password}>
    {#if showPassword}
      <span class="eye__closed">◎</span>
    {:else}
      <span class="eye__open">◉</span>
    {/if}
    <button onclick={login}> login </button>
  </div>
</main>
<style>
  main {
    display:grid;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
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
</style>