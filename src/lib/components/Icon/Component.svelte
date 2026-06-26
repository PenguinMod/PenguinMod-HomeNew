<script>
    let props = $props();
</script>

<span class="material-symbols" style={props.style}>
    {@render props.children?.()}
</span>

<style>
    .material-symbols {
        user-select: none;
    }
</style>