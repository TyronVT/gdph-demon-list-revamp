<script lang="ts">
    import { ExternalLink } from "lucide-svelte";
    export let levelsToBeDisplayed: Promise<any>; 

</script>

<div class="space-y-2">
    {#await levelsToBeDisplayed}
        <div>Loading Levels...</div>
    {:then data}
        {#each data as level, index}
        <div class="flex items-center justify-center space-x-2">
            {#if level.level_rank_int <=75}
                <p><span class="font-bold">
                    {level.level_name}
                    {#if Number(level.percent_completed) < 100}
                        [{level.percent_completed}%]
                    {/if}
                </span></p>
            {/if}
            {#if level.level_rank_int > 75 && level.level_rank_int <= 150}
                <p>
                    {level.level_name}
                    {#if Number(level.percent_completed) < 100}
                        [{level.percent_completed}%]
                    {/if}
                </p>
            {/if}
            {#if level.level_rank_int > 150}
                <p><span class="italic text-gray-500">
                    {level.level_name}
                    {#if Number(level.percent_completed) < 100}
                        [{level.percent_completed}%]
                    {/if}
                </span></p>
            {/if}
            {#if level.youtube_video}
                <a href={level.youtube_video} target="_blank">
                    {#if level.level_rank_int > 150}
                        <ExternalLink size="20" color="rgb(107, 114, 128)"/>
                    {:else}
                        <ExternalLink size="20" />
                    {/if}
                </a>
            {/if}
        </div>
        {/each}
    {/await}
</div>