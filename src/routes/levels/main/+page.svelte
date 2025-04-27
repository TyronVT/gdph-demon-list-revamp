<script>
    import Titlepage from "../../Titlepage.svelte";
    import Level from "../Level.svelte";
    import {SERVER_URL} from "../../../config";
	import { MoveDown } from "lucide-svelte";

    async function getLevels() {
        return fetch(`${SERVER_URL}/api/levels/main`)
        .then(response => response.json());
    }
</script>

<Titlepage titleName="Main List" description="1-75" />

<div class="flex flex-col items-center gap-8 pt-8 pl-2 pr-2">
    {#await getLevels()}
        <p>Fetching levels ...</p>
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

    <div class="flex pb-5">
    <a href="/levels/extended">
        <p>Extended</p>
    </a>
    <MoveDown />
    </div>
</div>