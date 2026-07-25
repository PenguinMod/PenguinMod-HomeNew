<script>
	import { PUBLIC_API_URL, PUBLIC_STUDIO_URL } from "$env/static/public";

    // Components
    import { Dropdown, DropdownItem, DropdownDivider } from "PenguinMod-SvelteUI";
    import Icon from "$lib/components/Icon/Component.svelte";
    import LocalizedAlt from "$lib/components/Localization/LocalizedAlt.svelte.js";
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";
    import LocalizedTooltip from "$lib/components/Localization/LocalizedTooltip.svelte.js";

    import languageInfo from "$lib/resources/localization/translation/language/language-info";

    import StateApplication from "$lib/state/app.svelte";
    import StoreSettings from "$lib/stores/settings";
    import StoreSession from "$lib/stores/session";

    const optionLanguage = (newLangCode) => {
        $StoreSettings.appLanguage = newLangCode;
    };
    const optionTheme = (newTheme) => {
        $StoreSettings.appTheme = newTheme;
    };
</script>

<div class="navigation-bar">
    <div class="navigation-bar-section navigation-options">
        <!-- site settings small button -->
        <button
            class="navigation-button"
            style="anchor-name: --pm-dropdown-navigation-bar-settings"
            popovertarget="pm-dropdown-navigation-bar-settings"
            {@attach LocalizedTooltip("account.settings.title")}
        >
            <Icon filled={true}>settings</Icon>
            <Icon>arrow_drop_down</Icon>
        </button>
        <Dropdown
            id="pm-dropdown-navigation-bar-settings"
            style="position-anchor: --pm-dropdown-navigation-bar-settings;"
        >
            <!-- language switcher -->
            <DropdownItem
                style="anchor-name: --pm-dropdown-navigation-bar-settings-language"
                popovertarget="pm-dropdown-navigation-bar-settings-language"
            >
                <Icon>language</Icon>
                <LocalizedString
                    text="Switch Language"
                    key="navigation.language"
                />
                <Icon>arrow_right</Icon>
            </DropdownItem>
            <Dropdown
                id="pm-dropdown-navigation-bar-settings-language"
                style="position-anchor: --pm-dropdown-navigation-bar-settings-language;"
            >
                <!-- same as browser -->
                <DropdownItem onclick={() => optionLanguage("browser")}>
                    <Icon>captive_portal</Icon>
                    <LocalizedString
                        text="Same as browser"
                        key="lang.default"
                    />
                </DropdownItem>
                <DropdownDivider />
                <!-- language selection -->
                <span><b>
                    <LocalizedString
                        text="$1 languages translated"
                        key="lang.count"
                        replacers={{
                            "$1": languageInfo.languageCountListed
                        }}
                    />
                </b></span>
                {#each languageInfo.languageOrderListed as langCode}
                    <DropdownItem onclick={() => optionLanguage(langCode)}>
                        {languageInfo.languageName[langCode] || "You should never see this text"}
                    </DropdownItem>
                {/each}
                <!-- joke lang link -->
                <!-- TODO: This should link to /settingssite and thatll have the joke langs available -->
                <DropdownItem href="/settingssite">
                    <LocalizedString
                        text="See more"
                        key="home.seemore"
                    />
                    <Icon>open_in_new</Icon>
                </DropdownItem>
            </Dropdown>
            <!-- theme switcher -->
            <!-- TODO: This should open a menu that shows a theme picker -->
            <DropdownItem
                style="anchor-name: --pm-dropdown-navigation-bar-settings-theme"
                popovertarget="pm-dropdown-navigation-bar-settings-theme"
            >
                <Icon>dark_mode</Icon>
                <LocalizedString
                    text="Switch theme"
                    key="navigation.theme"
                />
                <Icon>arrow_right</Icon>
            </DropdownItem>
            <Dropdown
                id="pm-dropdown-navigation-bar-settings-theme"
                style="position-anchor: --pm-dropdown-navigation-bar-settings-theme;"
            >
                <DropdownItem onclick={() => optionTheme("light")}>
                    <Icon>light_mode</Icon>
                    <LocalizedString
                        text="Light Theme"
                        key="profile.donator.themetype.light"
                    />
                </DropdownItem>
                <DropdownItem onclick={() => optionTheme("contrast")}>
                    <Icon filled={true}>light_mode</Icon>
                    <LocalizedString
                        text="Light (Contrast)"
                        key="TODO: This needs to be done"
                    />
                </DropdownItem>
                <DropdownItem onclick={() => optionTheme("dark")}>
                    <Icon>dark_mode</Icon>
                    <LocalizedString
                        text="Dark Theme"
                        key="profile.donator.themetype.dark"
                    />
                </DropdownItem>
                <DropdownItem onclick={() => optionTheme("amoled")}>
                    <Icon filled={true}>dark_mode</Icon>
                    <LocalizedString
                        text="Dark (Contrast)"
                        key="TODO: This needs to be done"
                    />
                </DropdownItem>
            </Dropdown>
            <!-- site settings link  -->
            <!-- TODO: This should link to /settingssite -->
            <DropdownItem href="/settingssite">
                <LocalizedString
                    text="See more"
                    key="home.seemore"
                />
                <Icon>open_in_new</Icon>
            </DropdownItem>
        </Dropdown>
    </div>
    <div class="navigation-bar-section navigation-links">
        <a class="navigation-logo" href="/">
            <img
                class="navigation-logo-image"
                src="/asset/icons/penguinmod-white-outline.svg"
                alt="PenguinMod"
            />
        </a>

        <!-- generic links -->
        <a
            href={PUBLIC_STUDIO_URL}
            class="navigation-button-link"
            {@attach LocalizedTooltip("navigation.create")}
        >
            <button tabindex="-1">
                <LocalizedString
                    text="Create"
                    key="navigation.create"
                />
            </button>
        </a>

        <!-- TODO: Search bar should be here. Should probably be its own element if we want to attach autofill and stuff to it -->
        <!-- TODO: Add search suggestions like ext gallery, but they'll be like "Search for projects, search for users, etc" -->
        <!-- TODO: Add some autofill & standards in general for the selectors used in legacy home -->

        <!-- account buttons -->
        {#if StateApplication.loggedInProcessed && $StoreSettings.loggedIn}
            <!-- TODO: This should link to the messages tab -->
            <a
                href={PUBLIC_STUDIO_URL}
                class="navigation-button-link"
                {@attach LocalizedTooltip("messages.title")}
            >
                <button tabindex="-1">
                    <Icon>mail</Icon>
                </button>
            </a>
            <!-- TODO: This should link to the my stuff tab -->
            <a
                href={PUBLIC_STUDIO_URL}
                class="navigation-button-link"
                {@attach LocalizedTooltip("navigation.mystuff")}
            >
                <button tabindex="-1">
                    <Icon>folder</Icon>
                </button>
            </a>
            {#if $StoreSession.userCachedAdmin || $StoreSession.userCachedMod}
                <!-- TODO: This should link to the admin panell -->
                <!-- NOTE: We dont translate admin-only elements -->
                <a
                    href={PUBLIC_STUDIO_URL}
                    class="navigation-button-link"
                >
                    <button tabindex="-1">
                        <Icon>admin_panel_settings</Icon>
                    </button>
                </a>
            {/if}
        {/if}

        <!-- login buttons -->
        {#if StateApplication.loggedInProcessed && !($StoreSettings.loggedIn)}
            <!-- TODO: Link to the sign in page -->
            <!-- TODO: When redirecting to the sign in page, we should preserve ALL of the "referrer" URL. ALL of it. -->
            <a
                href={PUBLIC_STUDIO_URL}
                class="navigation-button-link"
                {@attach LocalizedTooltip("navigation.login")}
            >
                <button tabindex="-1">
                    <LocalizedString
                        text="Sign in"
                        key="navigation.login"
                    />
                </button>
            </a>
            <!-- TODO: Link to the sign up page -->
            <!-- TODO: When redirecting to the sign up page, we should preserve ALL of the "referrer" URL. ALL of it. -->
            <a
                href={PUBLIC_STUDIO_URL}
                class="navigation-button-link"
                {@attach LocalizedTooltip("navigation.signup")}
            >
                <button tabindex="-1">
                    <LocalizedString
                        text="Sign up"
                        key="navigation.signup"
                    />
                </button>
            </a>
        {/if}
    </div>
    <div class="navigation-bar-section navigation-others">
        <!-- events -->
        <!-- TODO: UNIMPORTANT: Test out filling this bar with multiple events later. -->
    </div>
</div>

<style>
    .navigation-bar {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
        height: 3rem;

		display: flex;
		flex-direction: row;
        justify-content: space-between;

        background: #00c3ff;
        color: white;
        overflow: hidden;

        z-index: 99999;
    }
    .navigation-bar > * {
        margin: 0 2px;
    }
    .navigation-bar button {
        color: white;
        font-weight: bold;
        font-size: .85rem;
    }
    .navigation-bar-section {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
    }
    /* TODO: does this look good or does this look like Buns */
    :global(body.app-theme-dark) .navigation-bar {
        background: #111;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .navigation-options,
    .navigation-others {
        width: 25%;
    }
    .navigation-options {
        justify-content: flex-start;
    }
    .navigation-others {
        justify-content: flex-end;
    }

    /* NOTE: Unlike legacy home, we intend on not shifting the entire UI on logo hover */
    .navigation-logo {
        width: 3rem;
		height: 3rem;
        margin: 0 4px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    }
    .navigation-logo-image {
        width: 85%;
		height: 85%;

        transition: 0.15s ease;
    }
    .navigation-logo:hover .navigation-logo-image {
        width: 95%;
		height: 95%;

        transition: 0.15s ease;
    }

    .navigation-button,
    .navigation-button-link {
        height: calc(100% - 8px);
    }
    .navigation-button-link button {
        height: 100%;
    }
    .navigation-button,
    .navigation-button-link button {
        padding: 0 12px;

        background: transparent;
        border: 0;
        border-radius: 4px;

        cursor: pointer;

        &:hover {
            background: rgba(0, 0, 0, 0.1);
        }
    }
    .navigation-button-link button img {
        width: 20px;
        height: 20px;
    }
</style>
