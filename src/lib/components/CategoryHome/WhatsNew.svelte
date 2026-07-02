<script>
    import { onMount } from "svelte";

    // components
    import { Category } from "PenguinMod-SvelteUI";
    import Icon from "$lib/components/Icon/Component.svelte";
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";
    
    import { CACHE_BASIC_API_UPDATES } from "$lib/resources/cache/cache-time";
    import PenguinModBasicAPI from "$lib/resources/penguinmod/basic-api";
    import CacheHelper from "$lib/resources/cache/cache-helper";
    import externalLinks from "$lib/resources/external-links";
    
    import StoreSettings from "$lib/stores/settings";
    import StoreSession from "$lib/stores/session";
    
    let props = $props();
    let loading = $state(false);
    let failed = $state(false);
    const loadingAttempt = async () => {
        if (!CacheHelper.isExpired("frontpageUpdatesCachedTime", CACHE_BASIC_API_UPDATES)) return;

        const updates = await PenguinModBasicAPI.updates();
        CacheHelper.update({
            frontpageUpdatesCachedUpdates: updates,
        });
    };
    onMount(async () => {
        if (loading) return;
        loading = true;
        
        try {
            await loadingAttempt();
        } catch (err) {
            console.error(err);
            failed = true;
        } finally {
            loading = false;
        }
    });
</script>

<Category {...props}>
    <!-- What's new? Category -->
    {#snippet header()}
        <LocalizedString
            text="What's new?"
            key="home.sections.whatsnew"
        />
    {/snippet}
    {#snippet headerSecondary()}
        <a href={externalLinks.discord} target="_blank">
            <LocalizedString
                text="See more"
                key="home.seemore"
            />
            <Icon style="font-size:0.9rem;display:inline">
                open_in_new
            </Icon>
        </a>
    {/snippet}
    {#if loading}
        <p>TODO: Loading spinner</p>
    {:else if failed}
        <div class="single-container" style="color:red">
            <Icon style="font-size:48px">cloud_alert</Icon>
            <span>
                <LocalizedString
                    text="An error occurred while the server tried to access content on another server."
                    key="navigation.error.502"
                />
            </span>
        </div>
    {:else}
        {#each $StoreSession.frontpageUpdatesCachedUpdates as update}
            {#if update.headline}
                <h2 style="margin-block:8px">{update.headline}</h2>
            {/if}
            <p>{update.content}</p>
            {#if update.image}
                <hr />
                <a href={update.image} target="_blank">
                    <img
                        src={update.image}
                        alt={update.content}
                        style="width:100%"
                    />
                </a>
            {/if}
        {:else}
            <p>
                <LocalizedString
                    text="Nothing yet!"
                    key="generic.noneyet"
                />
            </p>
        {/each}
    {/if}
</Category>

<style>
    .single-container {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
