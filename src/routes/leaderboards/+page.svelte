<script>
    import Titlepage from "../Titlepage.svelte";
    import Player from "./Player.svelte";
    import Pocketbase from "pocketbase";
    import {SERVER_URL} from "../../serverselector";
    
    const pb = new Pocketbase(SERVER_URL);
    async function getPlayers() {
        const records = await pb.collection("player_ranks_and_points").getFullList();
        return records
    }
</script>

<Titlepage titleName="Leaderboards" description="Ranked list of people with points on the Demon List" />

<div class="flex flex-col items-center gap-8 pt-8">
    {#await getPlayers()}
        <p>Fetching players ...</p>
    {:then data}
        {#each data as player, index}
            <Player playerName={player.player_name} playerRank={index + 1} playerPoints={Number(player.total_points).toFixed(2)} />
        {/each}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>