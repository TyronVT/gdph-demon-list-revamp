<script>
    import Titlepage from "../../Titlepage.svelte";
    import Level from "../Level.svelte";
    import {SERVER_URL} from "../../../config";
    
    async function getLevels() {
        return fetch(`${SERVER_URL}/api/levels/extended`)
        .then(response => response.json());
    }
</script>

<Titlepage titleName="Extended List" description="76 - 150" />

<div class="flex flex-col items-center gap-8 pt-8 pl-2 pr-2">
    {#await getLevels()}
        <p>Fetching players ...</p>
    {:then data}
        {#each data as level, index}
            <Level 
                levelName={level.level_name} 
                levelRank={level.level_rank_int} 
                levelPoints={level.level_points} 
                listRequirement={level.list_requirement} 
                thumbnail={level.thumbnail}
            />
        {/each}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</div>