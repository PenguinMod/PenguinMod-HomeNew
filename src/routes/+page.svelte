<script>
    // components
    import { Button } from "PenguinMod-SvelteUI";
    import Icon from "$lib/components/Icon/Component.svelte";
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";
    
    import TranslationLoader from "$lib/resources/localization/translation/loader";

    import StateApplication from "$lib/state/app.svelte";
    import StoreSettings from "$lib/stores/settings.js";

    import externalLinks from "$lib/resources/external-links";
</script>

<main>
    <div class="section-onboarding">
        <div class="section-onboarding-studio">
            <div class="section-onboarding-studio-inner">
                <p>
                    <LocalizedString
                        text="Block-based coding with tons of capabilities"
                        key="home.introduction1"
                    />
                </p>
                <p>
                    <LocalizedString
                        text="Built off of Scratch and TurboWarp"
                        key="home.introduction2"
                    />
                </p>
                <Button kind="highlighted">
                    <Icon>open_in_new</Icon>
                    <div style="width:8px;"></div>
                    <LocalizedString
                        text="Try it out"
                        key="home.tryout"
                    />
                </Button>
            </div>
        </div>
        <div class="section-onboarding-showoff">
            <div class="section-onboarding-showoff-inner">
                <!-- TODO: Logged in only -->
                <!-- <iframe
                    class="section-onboarding-showoff-inner-video"
                    width="560"
                    height="315"
                    src="https://www.youtube-nocookie.com/embed/g8zwb4W3G8Q"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                    frameborder="0"
                ></iframe> -->
                <!-- TODO: Logged out only -->
                <img
                    src="https://penguinmod.com/penguins/frontpage.svg"
                    alt="PenguinMod"
                />
            </div>
        </div>
    </div>
    {#if !(($StoreSettings.appLanguage === "browser") || ($StoreSettings.appLanguage === "en"))}
        <div class="section-language-warning">
            <Icon>translate</Icon>
            <div style="width:4px;"></div>
            <p>
                <LocalizedString
                    text="PenguinMod is made by English-speaking developers. Expect minor issues and sorry for any translation errors."
                    key="translation.warning"
                />
            </p>
        </div>
    {/if}
    
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    <h1>Coming soon...</h1>
    <p>Dun dun...</p>
    
    <div class="section-footer">
        <p style="margin-block-end: 2px;">
            <LocalizedString
                text="PenguinMod is not affiliated with Scratch, TurboWarp, the Scratch Team, or the Scratch Foundation."
                key="home.footer.notaffiliated"
            />
        </p>
        <!-- TODO: Markdown -->
        <p style="margin-block-start: 2px;">
            <LocalizedString
                text={"Scratch is a project of the Scratch Foundation. It is available for free at {{LINK}}."}
                key="home.footer.notaffiliated2"
                replacers={{
                    "{{LINK}}": "https://scratch.org/",
                }}
            />
        </p>

        <div class="section-footer-list">
            <div class="section-footer-list-item">
                <p>
                    <LocalizedString
                        text="Website"
                        key="home.footer.sections.website"
                    />
                </p>
                <a href={externalLinks.editor}>
                    <LocalizedString
                        text="Editor"
                        key="home.footer.sections.website.editor"
                    />
                </a>
                <a href={externalLinks.credits}>
                    <LocalizedString
                        text="Credits"
                        key="home.footer.sections.website.credits"
                    />
                </a>
                <a href={externalLinks.github}>
                    <LocalizedString
                        text="Source"
                        key="home.footer.sections.website.source"
                    />
                </a>
                <a href={externalLinks.packager}>
                    <LocalizedString
                        text="Packager"
                        key="home.footer.sections.website.packager"
                    />
                </a>
            </div>
            <div class="section-footer-list-item">
                <p>
                    <LocalizedString
                        text="Community"
                        key="home.footer.sections.community"
                    />
                </p>
                <a href={externalLinks.issues}>
                    <LocalizedString
                        text="Report an issue"
                        key="home.footer.sections.info.reportissue"
                    />
                </a>
                <a href={externalLinks.wiki}>
                    <LocalizedString
                        text="Community Wiki"
                        key="home.footer.sections.community.wiki"
                    />
                </a>
                <a href={externalLinks.discord}>
                    <LocalizedString
                        text="Join our Discord!"
                        key="navigation.discord"
                    />
                </a>
            </div>
            <div class="section-footer-list-item">
                <p>
                    <LocalizedString
                        text="Info"
                        key="home.footer.sections.info"
                    />
                </p>
                <a href={"/terms"}>
                    <LocalizedString
                        text="Terms of Service"
                        key="home.footer.sections.info.terms"
                    />
                </a>
                <a href={"/privacy"}>
                    <LocalizedString
                        text="Privacy Policy"
                        key="home.footer.sections.info.privacy"
                    />
                </a>
                <a href={"/guidelines/uploading"}>
                    <LocalizedString
                        text="Uploading Guidelines"
                        key="home.footer.sections.info.guidelines"
                    />
                </a>
                <a href={externalLinks.contact}>
                    <LocalizedString
                        text="Contact Us"
                        key="home.footer.sections.info.contact"
                    />
                </a>
            </div>
            <div class="section-footer-list-item">
                <p>
                    <LocalizedString
                        text="Funding"
                        key="home.footer.sections.donate"
                    />
                </p>
                <a href={"/support"}>
                    PenguinMod
                </a>
                <a href={externalLinks.scratch}>
                    Scratch
                </a>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    .section-onboarding {
        width: 100%;
        height: 24rem;

        display: flex;
        flex-direction: row;

        background: #00c3ffad;
        color: white;
    }
    .section-onboarding-studio,
    .section-onboarding-showoff {
        width: 50%;

        display: flex;
        align-items: center;
        justify-content: center;
    }
    .section-onboarding-studio-inner,
    .section-onboarding-showoff-inner {
        width: 80%;
        height: 80%;
    }
    .section-onboarding-studio-inner {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;

        overflow-wrap: break-word;
        font-weight: bold;
        font-size: 2em;
    }
    .section-onboarding-studio-inner p {
        margin-block: 16px;
    }
    .section-onboarding-showoff-inner {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .section-onboarding-showoff-inner-video {
        border-radius: 8px;
        outline-width: 6px;
        outline-style: solid;
        outline-color: rgba(255, 255, 255, 0.35);
    }
    
    .section-language-warning {
        width: 100%;
        margin: 0px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background: #ffd00073;
        color: black;

        font-size: 18px;
        font-weight: bold;
        text-align: center;
    }
    :global(body.app-theme-dark) .section-language-warning {
        color: white;
    }

    .section-footer {
        width: 100%;
        margin-top: 4px;
        padding: 24px 0 48px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        border-top: rgba(0, 0, 0, .3) 1px solid;
        background: #00c3ff15;
        font-weight: 700;
    }
    .section-footer-list {
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .section-footer-list-item {
        margin: 0 32px;

        display: flex;
        flex-direction: column;
        
        font-size: 14px;
    }
    .section-footer-list-item a {
        margin: 2px 0;

        font-weight: normal;
    }
</style>