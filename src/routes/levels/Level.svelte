<script lang="ts">
    import { SERVER_URL } from "../../serverselector";
    import { Button } from "$lib/components/ui/button/index";
    import { ChevronDown } from 'lucide-svelte';
    import { ChevronUp } from "lucide-svelte";

    import * as Card from "$lib/components/ui/card/index";
	import LeveLeaderboard from "./LeveLeaderboard.svelte";

    export let levelName;
    export let levelPoints;
    export let levelRank;
    
    let showLeaderboard = false;

    function toggleLeaderboard() {
        showLeaderboard = !showLeaderboard;
    }

    async function fetchLeaderboard(levelName: string) {
        return await fetch(`${SERVER_URL}/api/level_leaderboard/${levelName}`)
        .then(response => response.json());
    }
    
</script>

<Card.Root class="w-8/12">
    <Card.Root class="flex justify-between items-center p-4">
        <Card.Header>
            <Card.Title>
                    <h1>
                        #{levelRank} - {levelName}
                    </h1>        
            </Card.Title>
            <Card.Description>
                <p>
                    {levelPoints} points
                </p>            
            </Card.Description>
        </Card.Header>
    
        <Button variant="outline" size="icon" on:click={toggleLeaderboard}>
            {#if showLeaderboard}
                <ChevronUp />
            {:else}
                <ChevronDown />
            {/if}
        </Button>
    </Card.Root>
    
    {#if showLeaderboard}
        <LeveLeaderboard leaderboard={fetchLeaderboard(levelName)} />
    {/if}

</Card.Root>