<script>
    import { onMount } from "svelte";

    // components
    import { Category, UserDisplay } from "PenguinMod-SvelteUI";
    import Icon from "$lib/components/Icon/Component.svelte";
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";
    
    import { CACHE_BASIC_API_UPDATES } from "$lib/resources/cache/cache-time";
    import CacheHelper from "$lib/resources/cache/cache-helper";

    import PenguinModBasicAPI from "$lib/resources/penguinmod/basic-api";
    import externalLinks from "$lib/resources/external-links";
    import Locale from "$lib/resources/localization/locale";
    
    import StoreSettings from "$lib/stores/settings";
    import StoreSession from "$lib/stores/session";
    
    let props = $props();
    let loading = $state(false);
    let failed = $state(false);
    const loadingAttempt = async () => {
        // NOTE: We only actually ask the API if our own cache is expired (or doesnt exist, which is also counted as expired)
        if (!CacheHelper.isExpired("frontpageUpdatesCachedTime", CACHE_BASIC_API_UPDATES)) return;

        const updates = await PenguinModBasicAPI.updates();
        CacheHelper.update({
            frontpageUpdatesCachedUpdates: updates,
        });
    };
    onMount(async () => {
        if (loading) return;
        loading = true; // TODO: remove these loading false then true then false things
        
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
        <!-- NOTE: This used to link to the updates channel but that kinda sucks because you cant see it if you havent joined -->
        <!-- TODO: UNIMPORTANT: Maybe we should have our own update log that *then* links to discord, because discord is pretty icky -->
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
            <!-- TODO: UNIMPORTANT: PenguinSVG: server down icon -->
            <Icon style="font-size:48px">cloud_alert</Icon>
            <span>
                <LocalizedString
                    text="An error occurred while the server tried to access content on another server."
                    key="navigation.error.502"
                />
            </span>
        </div>
    {:else}
        <!-- TODO: UNIMPORTANT: Not sure if thisll render multiple updates nicely or not. Fix that -->
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
            {#if update.authorName}
                <UserDisplay
                    src={update.authorImage}
                    alt={update.authorName}
                    kind="detail"
                >
                    {#snippet textTop()}
                        <!-- TODO: UNIMPORTANT: This should be "Written by {{USERNAME}}" or smething, this feels awkward -->
                        <LocalizedString
                            text="$1 made a post"
                            key="feed.posted"
                            replacers={{
                                "$1": update.authorName
                            }}
                        />
                    {/snippet}
                    {#snippet textBottom()}
                        {Locale.timestampToDateWithTime(update.editedTimestamp || update.createdTimestamp)}
                    {/snippet}
                </UserDisplay>
            {/if}
        {:else}
            <!-- NOTE: This state would really only render on private servers or something. But we'll handle it nicely. -->
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
