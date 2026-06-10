<script>
    import { browser } from "$app/environment";

    // Components
    import NavigationBar from "$lib/components/Navigation/NavigationBar.svelte";

    import StateApplication from "$lib/state/app.svelte";
    import StoreSettings from "$lib/stores/settings.js";

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
    :global(body.app-theme-dark) main {
        background: #111;
        color: white;
    }

    .navigation-margin {
		width: 100%;
        height: 3rem;
    }
</style>