<script>
	import { PUBLIC_API_URL, PUBLIC_STUDIO_URL } from "$env/static/public";

    // Components
    import Icon from "$lib/components/Icon/Component.svelte";
</script>

<div class="navigation-bar">
    <div class="navigation-bar-section navigation-options">
        <button class="navigation-button">
            <Icon>dark_mode</Icon>
        </button>
        <button class="navigation-button">
            <Icon>language</Icon>
        </button>
    </div>
    <div class="navigation-bar-section navigation-links">
        <a class="navigation-logo" href="/">
            <img
                class="navigation-logo-image"
                src="/favicon.svg"
                alt="PenguinMod"
            />
        </a>

        <!-- generic links -->
        <a
            href={PUBLIC_STUDIO_URL}
            class="navigation-button-link"
        >
            <button tabindex="-1">
                Create
            </button>
        </a>
        
        <!-- account buttons -->
        <a
            href={PUBLIC_STUDIO_URL}
            class="navigation-button-link"
        >
            <button tabindex="-1">
                <Icon>mail</Icon>
            </button>
        </a>
        <a
            href={PUBLIC_STUDIO_URL}
            class="navigation-button-link"
        >
            <button tabindex="-1">
                <Icon>folder</Icon>
            </button>
        </a>
        <a
            href={PUBLIC_STUDIO_URL}
            class="navigation-button-link"
        >
            <button tabindex="-1">
                <Icon>admin_panel_settings</Icon>
            </button>
        </a>
        
        <!-- login buttons -->
        <a
            href={PUBLIC_STUDIO_URL}
            class="navigation-button-link"
        >
            <button tabindex="-1">
                Sign in
            </button>
        </a>
        <a
            href={PUBLIC_STUDIO_URL}
            class="navigation-button-link"
        >
            <button tabindex="-1">
                Sign up
            </button>
        </a>
    </div>
    <div class="navigation-bar-section navigation-others">
        <!-- events -->
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
        
        z-index: 1;
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
</style>