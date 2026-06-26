<script>
    // components
    import { Category } from "PenguinMod-SvelteUI";
    import Icon from "$lib/components/Icon/Component.svelte";
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";
    
    let props = $props();
</script>

<Category {...props}>
    <!-- My Feed Category -->
    {#snippet header()}
        <LocalizedString
            text="My Feed"
            key="home.sections.feed"
        />
    {/snippet}
    <!-- TODO: Add feed when signed in -->
    <div class="category-loggedout">
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
</Category>

<style>
    .category-loggedout {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .category-loggedout p {
        margin-block: 4px;
    }
</style>
