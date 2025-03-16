<script lang="ts">
    import { slide } from "svelte/transition";
    import PlayerDemonsContainer from "./PlayerDemonsContainer.svelte"
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
                <Tabs.Trigger value="main">Main [{data["Main Demons"].length}]</Tabs.Trigger>
                <Tabs.Trigger value="extended">Extended [{data["Extended Demons"].length}]</Tabs.Trigger>
                <Tabs.Trigger value="legacy">Legacy [{data["Legacy List"].length}]</Tabs.Trigger>
                <Tabs.Trigger value="progress">In Progress [{data["In Progress"].length}]</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="main">
                {#if data["Main Demons"].length <= 0}
                    <div>No main demons completed.</div>
                {:else}
                    <PlayerDemonsContainer levelsToBeDisplayed={data["Main Demons"]} />
                {/if}
            </Tabs.Content>
            
            <Tabs.Content value="extended">
                {#if data["Extended Demons"].length <= 0}
                    <div>No extended demons completed.</div>
                {:else}
                    <PlayerDemonsContainer levelsToBeDisplayed={data["Extended Demons"]} />
                {/if}
            </Tabs.Content>
            
            <Tabs.Content value="legacy">
                {#if data["Legacy List"].length <= 0}
                    <div>No demons from legacy list completed.</div>
                {:else}
                    <PlayerDemonsContainer levelsToBeDisplayed={data["Legacy List"]} />
                {/if}
            </Tabs.Content>
            
            <Tabs.Content value="progress">
                {#if data["In Progress"].length <= 0}
                    <div>No demons in progress.</div>
                {:else}
                    <PlayerDemonsContainer levelsToBeDisplayed={data["In Progress"]} />
                {/if}
            </Tabs.Content>
            
        </Tabs.Root>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>