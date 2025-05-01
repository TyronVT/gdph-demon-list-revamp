<script lang="ts">
    import { ExternalLink } from "lucide-svelte";
    interface Props {
        levelsToBeDisplayed: Promise<any>;
    }

    let { levelsToBeDisplayed }: Props = $props();

</script>

<div class="flex flex-wrap gap-1 justify-center">
    {#await levelsToBeDisplayed}
        <div>Loading Levels...</div>
    {:then data}
        {#each data as level, index}
        <div class="flex items-center justify-center space-x-2">
            <a href={level.youtube_video} target="_blank" class="hover:underline flex items-center justify-center">
                {#if level.level_rank_int <=75}
                    <p class="flex items-center"><span class="font-bold">
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
            </a>
            {#if index != data.length - 1}
            <div class="text-xl">•</div>
            {/if}
            
        </div>
        {/each}
    {/await}
</div>