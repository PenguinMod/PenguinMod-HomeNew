<script>
    let props = $props();
</script>

<span class="material-symbols">
    {@render props.children?.()}
</span>

<style>
    .material-symbols {
        user-select: none;
    }
</style>