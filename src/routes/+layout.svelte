<script>
    import NavigationBar from "$lib/Navigation/NavigationBar.svelte";

    let { children } = $props();
</script>

<NavigationBar />
<main>
    <div class="navigation-margin"></div>
    {@render children()}
</main>

<style>
    main {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        
        overflow: auto;
    }

    .navigation-margin {
		width: 100%;
        height: 3rem;
    }
</style>