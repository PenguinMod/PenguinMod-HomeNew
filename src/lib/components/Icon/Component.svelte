<script>
    let props = $props();
</script>

<!-- TODO: Should add a simple filled prop so we dont need to type the whole style tag gfor it -->
<span class="material-symbols-outlined" style={props.style}>
    {@render props.children?.()}
</span>

<style>
    .material-symbols-outlined {
        user-select: none;
    }
</style>