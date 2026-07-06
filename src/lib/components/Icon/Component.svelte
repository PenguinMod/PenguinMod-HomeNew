<script>
    let props = $props();
</script>

<!-- TODO: Should add a simple filled prop so we dont need to type the whole style tag gfor it -->
<span
    class={`material-symbols-outlined${props.filled ? " material-symbols-filled" : ""}`}
    style={props.style}
>
    {@render props.children?.()}
</span>

<style>
    .material-symbols-outlined {
        user-select: none;
    }
    .material-symbols-filled {
        font-variation-settings: 'FILL' 1;
    }
</style>