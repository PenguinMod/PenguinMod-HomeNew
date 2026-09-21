<script>
   	import { page } from '$app/state';
    import { PUBLIC_STUDIO_URL } from '$env/static/public';
    import PenguinModClient from "$lib/resources/penguinmod/client";
    import { Project } from 'PenguinMod-SvelteUI';

    let query = $derived(page.url.searchParams.get('q') ?? '');

    let projects = $state([]);
    $effect(async () => {
        projects = await PenguinModClient.projects.searchProjects({
            query,
        });
    })
</script>

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
