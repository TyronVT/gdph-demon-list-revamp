<script lang="ts">
    import { slide, fade } from "svelte/transition";
    import { SERVER_URL } from "../../config";

    interface Props {
        levelName: string;
    }

    async function fetchLeaderboard(levelName: string) {
        return await fetch(`${SERVER_URL}/api/level_leaderboard/${levelName}`)
        .then(response => response.json());
    }

    let { levelName }: Props = $props();
</script>

<div class="flex flex-col gap-10" transition:slide={{delay: 0, duration: 300}}>
    {#await fetchLeaderboard(levelName)}
        <div class="text-center font-outfit p-10">
            <p> Fetching Players ... </p>
        </div>
    {:then data}
        <div class="text-center font-outfit p-10 flex flex-col gap-10" transition:fade={{delay: 0, duration: 300}}>
            {#if data.length < 1}
                <p>This demon remains undefeated.</p>
            {/if}
            {#each data as player, index}
                {#if player.percent_completed < 100}
                    <i class="text-gray-400"><b><p>{index + 1}. {player.player_name} {player.percent_completed}% <u><a href={player.youtube_video}>[Video]</a></u></p></b></i>
                {:else}
                    <b><p>{index + 1}. {player.player_name} {player.percent_completed}% <u><a href={player.youtube_video}>[Video]</a></u></p></b>
                {/if}
            {/each}
        </div>
    {:catch error}
        <p class="text-center">{error.message}</p>
    {/await}
</div>