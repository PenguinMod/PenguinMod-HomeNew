<script>
	import { goto } from '$app/navigation';
    import TranslationMapper from '$lib/resources/localization/translation/mapper';
    import { DropdownItem } from 'PenguinMod-SvelteUI';
    import { Dropdown } from 'PenguinMod-SvelteUI';
    import { onMount } from 'svelte';

	let query = $state("");
	let focused = $state(false);

	let show_dropdown = $derived(focused && query.trim().length > 0);

	function search() {
		if (!query.trim()) return;

		goto(`/search?q=${encodeURIComponent(query)}`);
	}
</script>

<div
	class="search"
	onfocusin={() => focused = true}
	onfocusout={(e) => {
		if (!e.currentTarget.contains(e.relatedTarget)) {
			focused = false;
		}
	}}
>
	<form onsubmit={(e) => {
		e.preventDefault();
		search();
	}}>
		<input
			type="search"
			placeholder={TranslationMapper.mapCurrent("navigation.search", "Search...")}
			bind:value={query}
			style="anchor-name: --pm-dropdown-search-bar"
		/>
	</form>

    <Dropdown open={show_dropdown} anchor="--pm-dropdown-search-bar">
        <DropdownItem onclick={search}>
            <!-- TODO: translate -->
            search 4 projects
        </DropdownItem>
        <DropdownItem>
            <!-- TODO: implement and translate -->
            search 4 users
        </DropdownItem>
    </Dropdown>
</div>

<form onsubmit={(e) => {
	e.preventDefault();
	search();
}}>

</form>

<style>
	.search {
		position: relative;
	}
</style>
