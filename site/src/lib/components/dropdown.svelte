<script lang='ts'>
 let {button, content} = $props();
 let showContent: boolean = $state(false);
</script>
<main>
    <button class='button' onclick={() => showContent = !showContent}>
        {@render button()}
    </button>
    {#if showContent}
        <div class='content'>
            {@render content()}
        </div>
    {/if}
</main>
<style>
    .button {
        position: relative;
    }
    .content {
        position:absolute;
        padding: 1em;
        background-color: white;
    }
</style>