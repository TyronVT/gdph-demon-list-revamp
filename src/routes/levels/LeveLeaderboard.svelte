<script lang="ts">
    import { slide, fade } from "svelte/transition";

    export let leaderboard: Promise<any>;
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
                <p>{index + 1}. {player.player_name}</p>
            {/each}
        </div>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>