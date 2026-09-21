<script>
   	import { page } from '$app/state';
    import { PUBLIC_STUDIO_URL } from '$env/static/public';
    import PenguinModClient from "$lib/resources/penguinmod/client";
    import { Project } from 'PenguinMod-SvelteUI';

    let query = $derived(page.url.searchParams.get('q') ?? '');

    let projects = $state([]);
    let total = $state(0);
    let total_seen = $state(0);
    $effect(async () => {
        // NOTE FOR THE FUTURE: we should ONLY update total when QUERY changes.
        // this effect will probably be called when page changes.
        // Make total only update when QUERY changes (note the boolean on search projects)

        const res = await PenguinModClient.projects.searchProjects({
            query,
        }, true);

        projects = res.projects;
        total = res.total;

        // TODO: when query changes, this should reset
        total_seen += projects.length;
    })
</script>

{total_seen} / {total}

{#each projects as project}
    <Project
        src={PenguinModClient.projects.getProjectThumbnailURL(project.id)}
        userSrc={PenguinModClient.users.getPfpUrl(project.author.username)}
        href={`${PUBLIC_STUDIO_URL}/#${project.id}`}
        glint={project.featured ? "featured" : null}
        title={project.title}
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
