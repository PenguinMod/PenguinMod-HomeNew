<script>
    import { page } from "$app/state";
    import { PUBLIC_STUDIO_URL } from "$env/static/public";
    import PenguinModClient from "$lib/resources/penguinmod/client";
    import { Button, Project } from "PenguinMod-SvelteUI";

    import { goto } from "$app/navigation";

    let featured = $state({
        include: false,
        val: true,
    });
    let reverse = $state(false);
    let sort = $state();

    let query = $derived({
        query: page.url.searchParams.get("q") ?? "",
        featured: featured.include ? featured.val : null,
        reverse,
        sort,
    });

    let cur_page = $derived(Number(page.url.searchParams.get("page") ?? "0"));
    let projects = $state([]);
    let total = $state(0);
    let total_seen = $state(0);

    // svelte-ignore state_referenced_locally
    let last_query;

    let req_id = 0;

    // TODO: maybe add a cooldown

    $effect(() => {
        const current_query = query;
        const current_page = cur_page;

        const is_new_query = current_query !== last_query;
        const this_rq = ++req_id;

        if (is_new_query) {
            total_seen = 0;
        }

        (async () => {
            const res = await PenguinModClient.projects.searchProjects(
                { page: current_page, ...current_query },
                is_new_query,
            );

            if (this_rq !== req_id) return;

            projects = res.projects;

            if (is_new_query) {
                total = res.total;
                last_query = current_query;
            }

            total_seen = current_page * 20 + projects.length;
        })();
    });

    function reload_change(name, new_val) {
        const url = new URL(page.url);
        url.searchParams.set(name, new_val);
        goto(url);
    }
</script>

<br>

<div class="search-grid">
    <!-- TODO: translate text -->
    <div class="chud-box">
        include feature:
        <input bind:checked={featured.include} type="checkbox" />
        {#if featured.include}
            only featured or only not
            <input bind:checked={featured.val} type="checkbox" />
        {/if}
    </div>

    <div class="chud-box">
        reverse:
        <input bind:checked={reverse} type="checkbox" />
    </div>

    <!-- sort?: "newest-update" | "newest-upload" | "views" | "votes" | "loves" -->
    <div class="chud-box">
        sort:
        <select bind:value={sort}>
            <!-- NOTE: to translate, translate the thing inside the option, not the value parameter -->
            <option value="views"> views </option>
            <option value="votes"> votes </option>
            <option value="loves"> loves </option>
            <option value="newest-update"> newest update </option>
            <option value="newest-upload"> newest upload </option>
        </select>
    </div>
</div>

<div class="search-grid">
{#each projects as project}
    <Project
        src={PenguinModClient.projects.getProjectThumbnailURL(project.id)}
        userSrc={PenguinModClient.users.getPfpUrl(project.author.username)}
        href={`${PUBLIC_STUDIO_URL}/#${project.id}`}
        glint={project.featured ? "featured" : null}
        title={project.title}
        class="project"
    >
        {#snippet textTop()}
            <!-- TODO: This should be rendered with inline untrusted markdown -->
            {project.title}
        {/snippet}
        {#snippet textBottom()}
            {project.author.username}
        {/snippet}
    </Project>
{/each}
</div>

<div class="search-grid">
    {#if cur_page > 0}
    <button onclick={() => reload_change("page", cur_page - 1)}>
        left arrow
    </button>
    {/if}

    <!-- TODO: do we need to translate numbers -->
    <!-- buttons with numbers n stuff -->

    {#if total_seen < total}
    <button onclick={() => reload_change("page", cur_page + 1)}>
        right arrow
    </button>
    {/if}
</div>

<style>
    .search-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        width: 100%;
    }

    .chud-box {
        outline: 2px solid green;
    }
</style>
