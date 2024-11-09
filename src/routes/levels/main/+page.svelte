<script>
    import Titlepage from "../../Titlepage.svelte";
    import Level from "../Level.svelte";
    import {SERVER_URL} from "../../../config";
    
    async function getLevels() {
        return fetch(`${SERVER_URL}/api/levels/main`)
        .then(response => response.json());
    }
</script>

<Titlepage titleName="Main List" description="1-75" />

<div class="flex flex-col items-center gap-8 pt-8">
    {#await getLevels()}
        <p>Fetching levels ...</p>
    {:then data}
        {#each data as level, index}
            <Level levelName={level.level_name} levelRank={level.level_rank_int} levelPoints={level.level_points} />
        {/each}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>