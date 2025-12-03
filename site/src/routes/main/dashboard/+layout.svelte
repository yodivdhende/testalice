<script lang='ts'>
	let { children } = $props();
</script>
<main>
    <section>
        {@render children()}
    </section>
</main>
<style>
    main {
        display: grid;
        width: 100%;
        height: 100%;
        background-color: rgba(50, 50, 50, 0.8);
    }

    section {
        justify-self: center;
        align-self: center;
    }
</style>
