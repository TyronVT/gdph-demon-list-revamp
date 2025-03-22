<script lang="ts">
    import { slide, fade } from "svelte/transition";

    interface Props {
        leaderboard: Promise<any>;
    }

    let { leaderboard }: Props = $props();
</script>

<div class="flex flex-col gap-10" transition:slide={{delay: 0, duration: 300}}>
    {#await leaderboard}
        <div class="text-center font-outfit p-10">
            <p> Fetching Players ... </p>
        </div>
    {:then data}
        <div class="text-center font-outfit p-10 flex flex-col gap-10" transition:fade={{delay: 0, duration: 300}}>
            {#if data.length < 1}
                <p>This demon remains undefeated.</p>
            {/if}
            {#each data as player, index}
                <b><p>{index + 1}. {player.player_name} {player.percent_completed}% <u><a href={player.youtube_video}>[Video]</a></u></p></b>
            {/each}
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>