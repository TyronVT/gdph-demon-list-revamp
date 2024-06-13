<script>
    import Titlepage from "../../Titlepage.svelte";
    import Level from "../Level.svelte";
    import Pocketbase from "pocketbase";
    import {SERVER_URL} from "../../../serverselector";
    
    const pb = new Pocketbase(SERVER_URL);
    async function getLevels() {
        return fetch(`${SERVER_URL}/api/levels/legacy`)
        .then(response => response.json());
    }
</script>

<Titlepage titleName="Legacy List" description="" />

<div class="flex flex-col items-center gap-8 pt-8">
    {#await getLevels()}
        <p>Fetching players ...</p>
    {:then data}
        {#each data as level, index}
            <Level levelName={level.level_name} levelRank={level.level_rank_int} levelPoints={level.level_points} />
        {/each}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>