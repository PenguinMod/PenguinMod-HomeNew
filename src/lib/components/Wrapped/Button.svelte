<script>
    import { Button } from "PenguinMod-SvelteUI";

    /**
     * @type {import('svelte').ComponentProps<typeof Button>}
     */
    let props = $props();
</script>

<!-- TODO: load the theme from settings and automatically put it here -->
<Button {...props} />