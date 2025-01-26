<script lang="ts">
    import { slide } from "svelte/transition";
    import * as Tabs from "$lib/components/ui/tabs/index";

    export let demons_completed: Promise<any>;
</script>

<div class="flex flex-col gap-10" transition:slide={{delay: 0, duration: 300}}>
    {#await demons_completed}
        <div class="text-center">
            <p> Fetching Demons ... </p>
        </div>
    {:then data}
        <Tabs.Root value="DemonsGroup" class="text-center">
            <Tabs.List class="grid grid-cols-4">
                <Tabs.Trigger value="main">Main</Tabs.Trigger>
                <Tabs.Trigger value="extended">Extended</Tabs.Trigger>
                <Tabs.Trigger value="legacy">Legacy</Tabs.Trigger>
                <Tabs.Trigger value="progress">In Progress</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="main">
                {#each data["Main Demons"] as level, index}
                    {#if level.youtube_video}
                        <a href={level.youtube_video} target="_blank">
                            <b><p>{level.level_name}</p></b>
                        </a>
                    {:else}
                        <b><p>{level.level_name}</p></b>
                    {/if}
                {/each}
            </Tabs.Content>
            
            <Tabs.Content value="extended">
                {#each data["Extended Demons"] as level, index}
                    {#if level.youtube_video}
                        <a href={level.youtube_video} target="_blank">
                           <p>{level.level_name}</p>
                        </a>
                    {:else}
                        <p>{level.level_name}</p>
                    {/if}
                {/each}
            </Tabs.Content>
            
            <Tabs.Content value="legacy">
                {#each data["Legacy List"] as level, index}
                    {#if level.youtube_video}
                        <a href={level.youtube_video} target="_blank">
                            <i><p>{level.level_name}</p></i>
                        </a>
                    {:else}
                        <i><p>{level.level_name}</p></i>
                    {/if}
                {/each}
            </Tabs.Content>
            
            <Tabs.Content value="progress">
                {#if data["In Progress"].length < 1}
                    <p>Nothing in progress.</p>
                {/if}
                {#each data["In Progress"] as level, index}
                    {#if level.youtube_video}
                        <a href={level.youtube_video} target="_blank">
                            <u><p>{level.level_name}, {level.percent_completed}%</p></u>
                        </a>
                    {:else}
                        <p>{level.level_name}, {level.percent_completed}%</p>
                    {/if}
                {/each}
            </Tabs.Content>
            
        </Tabs.Root>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>