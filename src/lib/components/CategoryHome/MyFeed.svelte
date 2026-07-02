<script>
    import { onMount } from "svelte";
    import { PUBLIC_STUDIO_URL } from "$env/static/public";

    // components
    import { Category, UserDisplay } from "PenguinMod-SvelteUI";
    import Icon from "$lib/components/Icon/Component.svelte";
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";
    
    import { CACHE_USER_FEED } from "$lib/resources/cache/cache-time";
    import CacheHelper from "$lib/resources/cache/cache-helper";

    import TranslationMapper from "$lib/resources/localization/translation/mapper";
    import PenguinModClient from "$lib/resources/penguinmod/client.js";
    import Locale from "$lib/resources/localization/locale";
    
    import StoreSettings from "$lib/stores/settings";
    import StoreSession from "$lib/stores/session";
    
    let props = $props();
    let loading = $state(false);
    let failed = $state(false);
    const loadingAttempt = async () => {
        if (!CacheHelper.isExpired("userFeedCachedTime", CACHE_USER_FEED)) return;

        const myFeed = await PenguinModClient.users.getMyFeed();
        CacheHelper.update({
            userFeedCachedData: myFeed,
        });
    };
    onMount(async () => {
        if (!($StoreSettings.loggedIn)) return;
        if (loading) return; // TODO: remove these loading false then true then false things
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

    // text handlers
    const getFeedText = (type, author, content) => {
        switch (type) {
            case "follow":
                return TranslationMapper.mapCurrent("feed.following", "$1 followed you")
                    .replaceAll("$1", author);
            case "upload":
                return TranslationMapper.mapCurrent("feed.uploaded", "$1 uploaded $2")
                    .replaceAll("$1", author)
                    .replaceAll("$2", content.name || TranslationMapper.mapCurrent("project.status.removed", "(removed)"));
            case "remix":
                return TranslationMapper.mapCurrent("feed.remixed", "$1 remixed $2")
                    .replaceAll("$1", author)
                    .replaceAll("$2", content.name || TranslationMapper.mapCurrent("project.status.removed", "(removed)"));
            case "posted":
                return TranslationMapper.mapCurrent("feed.posted", "$1 made a post")
                    .replaceAll("$1", author);
        }
    };
    const getFeedUrl = (type, author, content) => {
        switch (type) {
            case "upload":
            case "remix":
                return `${PUBLIC_STUDIO_URL}/#${content.id}`;
            case "posted":
                return `/profile/${author}?post=${content.id}`;
            default:
                return `/profile/${author}`;
        }
    };
</script>

<Category {...props}>
    <!-- My Feed Category -->
    {#snippet header()}
        <LocalizedString
            text="My Feed"
            key="home.sections.feed"
        />
    {/snippet}
    {#if !($StoreSettings.loggedIn)}
        <div class="category-textdisplay">
            <p>
                <Icon style="font-size:48px">chat_error</Icon>
            </p>
            <p>
                <LocalizedString
                    text="You are not properly logged in to access this page."
                    key="navigation.error.401"
                />
            </p>
        </div>
    {:else}
        {#if loading}
            <p>TODO: Loading spinner</p>
        {:else if failed}
            <div class="category-textdisplay" style="color:red">
                <p>
                    <Icon style="font-size:48px">cloud_alert</Icon>
                </p>
                <p>
                    <LocalizedString
                        text="Whoops! Our server's having some problems. Try again later."
                        key="home.server.error"
                    />
                </p>
            </div>
        {:else}
            <div class="category-feed">
                {#each $StoreSession.userFeedCachedData as feedItem}
                    <!-- TODO: use the right avatar URL (probably add getPfpUrl to api module) -->
                    <UserDisplay
                        src="https://projects.penguinmod.com/api/v1/users/getpfp?username=jeremygamer13"
                        href={getFeedUrl(feedItem.type, feedItem.username, feedItem.data)}
                        kind="detail"
                    >
                        {#snippet textTop()}
                            {getFeedText(feedItem.type, feedItem.username, feedItem.data)}
                        {/snippet}
                        {#snippet textBottom()}
                            {Locale.timestampToDateWithTime(Number(new Date(feedItem.date)))}
                        {/snippet}
                    </UserDisplay>
                {:else}
                    <div class="category-textdisplay">
                        <p>
                            <Icon style="font-size:48px">chat_dashed</Icon>
                        </p>
                        <p>
                            <LocalizedString
                                text="Nothing yet!"
                                key="generic.noneyet"
                            />
                        </p>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</Category>

<style>
    .category-textdisplay {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .category-textdisplay p {
        margin-block: 4px;
    }

    .category-feed {
        width: 100%;
        height: 100%;

        overflow: hidden;
        overflow-y: auto;
    }
    .category-feed :global(div[data-penguinmodsvelteui-userdisplay=true]) {
        margin-bottom: 4px;
    }
    .category-feed :global(div[data-penguinmodsvelteui-userdisplay=true]:last-child) {
        margin-bottom: 0;
    }
</style>
