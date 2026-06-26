<script>
    // components
    import { Category } from "PenguinMod-SvelteUI";
    import Icon from "$lib/components/Icon/Component.svelte";
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";

    let props = $props();
    
    // TODO: Fetch the basic api once and save into session storage
</script>

<Category {...props}>
    <!-- PenguinNews Category -->
    {#snippet header()}
        <LocalizedString
            text="PenguinNews"
            key="home.sections.informational"
        />
    {/snippet}
    {#snippet headerSecondary()}
        <!-- NOTE: Remove target="_blank" if page leads to penguinmod.com -->
        <a
            href={"https://itch.io/jam/all-the-mods-game-jam"}
            target="_blank"
        >
            <LocalizedString
                text="See more"
                key="home.seemore"
            />
            <!-- NOTE: remove this if the page leads to penguinmod.com -->
            <Icon style="font-size:0.9rem;display:inline">
                open_in_new
            </Icon>
        </a>
    {/snippet}
    <div>
        <h2 style="margin-block:4px;">
            All The Mods Game Jam has ended!
        </h2>
        <img
            src="https://penguinmod.com/events/news/allthemods2026.webp?r=1"
            alt="All The Mods 2026"
            style="width:100%;border-radius:8px;"
        />
        <hr />
        <div style="width:100%">
            <p>
                Thanks for participating in the event! Rankings will be announced
                on <a href="https://itch.io/jam/all-the-mods-game-jam">itch.io</a>.
                See you soon!
            </p>
            <a href="https://itch.io/jam/all-the-mods-game-jam">
                All The Mods on itch.io
            </a>
        </div>
    </div>
    {#snippet footer()}
        <!-- TODO: This should only display outside of english -->
        <LocalizedString
            text="PenguinNews is not translated in your language. Sorry! :("
            key="home.sections.informational.notranslation"
        />
    {/snippet}
</Category>
