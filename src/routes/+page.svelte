<script>
    import { Button } from "PenguinMod-SvelteUI";
    
    import StateApplication from "$lib/state/app.svelte";
    import StoreSettings from "$lib/stores/settings.js";
</script>

<h1>Coming soon...</h1>
<p>Dun dun...</p>
{$StoreSettings.appTheme}
<Button>Test</Button>