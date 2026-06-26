<script>
    // components
    import { Category } from "PenguinMod-SvelteUI";
    import Icon from "$lib/components/Icon/Component.svelte";
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";
    
    let props = $props();
    
    import externalLinks from "$lib/resources/external-links";

    // TODO: Fetch the basic api once and save into session storage
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
    <h2 style="margin-block:8px">Headline (first sentence)</h2>
    <p>Other Text</p>
    <hr />
    <a href={"https://projects.penguinmod.com/api/v1/projects/getproject?projectID=5410268069&requestType=thumbnail"} target="_blank">
        <img
            src={"https://projects.penguinmod.com/api/v1/projects/getproject?projectID=5410268069&requestType=thumbnail"}
            alt={"This would be the text from the update (placeholder image also)"}
            style="width:100%"
        />
    </a>
</Category>
