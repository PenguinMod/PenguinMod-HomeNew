<script>
	import {
        PUBLIC_API_URL,
        PUBLIC_STUDIO_URL
    } from "$env/static/public";
</script>

<div class="navigation-bar">
	<a class="navigation-logo" href="/">
		<img
            class="navigation-logo-image"
            src="/favicon.svg"
            alt="PenguinMod"
        />
	</a>

    <button class="navigation-button">
        ThemeASwitcher
    </button>

    <a
        href={PUBLIC_STUDIO_URL}
        class="navigation-button-link"
    >
        <button tabindex="-1">
            Create
        </button>
    </a>
    
    <a
        href={PUBLIC_STUDIO_URL}
        class="navigation-button-link"
    >
        <button tabindex="-1">
            Messages
        </button>
    </a>
    <a
        href={PUBLIC_STUDIO_URL}
        class="navigation-button-link"
    >
        <button tabindex="-1">
            My Poops
        </button>
    </a>
    <a
        href={PUBLIC_STUDIO_URL}
        class="navigation-button-link"
    >
        <button tabindex="-1">
            Panel
        </button>
    </a>
    
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

<style>
    .navigation-bar {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
        height: 3rem;
        
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;

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

    .navigation-logo {
        width: 3rem;
		height: 3rem;
        
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
        width: 97%;
		height: 97%;
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