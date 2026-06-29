<script>
    let props = $props();
</script>

<span class="material-symbols-outlined" style={props.style}>
    {@render props.children?.()}
</span>

<style>
    .material-symbols-outlined {
        user-select: none;
    }
</style>