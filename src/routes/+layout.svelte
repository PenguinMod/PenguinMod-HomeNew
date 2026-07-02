<script>
    import { browser } from "$app/environment";

    import { PenguinModAPIError } from "penguinmod";

    // Components
    import NavigationBar from "$lib/components/Navigation/NavigationBar.svelte";
    
    import TranslationLoader from "$lib/resources/localization/translation/loader.js";
    import Authenticator from "$lib/resources/penguinmod/authentication/authenticator.js";

    import StateApplication from "$lib/state/app.svelte";
    import StoreSettings from "$lib/stores/settings.js";
    import StoreSession from "$lib/stores/session.js";

    let { children } = $props();
    
    $effect(() => {
        const activeLanguage = $StoreSettings.appLanguage;
        TranslationLoader.initialize(activeLanguage);
    });
    $effect(async () => {
        // set loggedInProcessed
        if ($StoreSettings.loggedIn) {
            try {
                await Authenticator.updateOutdatedUserInfo();
            } catch (err) {
                // assume we got logged out if Reauthenticate
                if (err instanceof PenguinModAPIError && err.message === "Reauthenticate")
                    await Authenticator.logout();
            }
        }
        StateApplication.loggedInProcessed = true;
    });
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
        
        /* TODO: The navbar should not be above the scrollbar */
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