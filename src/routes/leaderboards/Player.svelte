<script lang="ts">
    import { SERVER_URL } from "../../config";
    import { Button } from "$lib/components/ui/button/index";
    import { ChevronDown } from 'lucide-svelte';
    import { ChevronUp } from "lucide-svelte";

    import * as Card from "$lib/components/ui/card/index";
	import PlayerDemons from "./PlayerDemons.svelte";

    interface Props {
        playerName: any;
        playerPoints: any;
        playerRank: any;
    }

    let { playerName, playerPoints, playerRank }: Props = $props();
    
    let showDemons = $state(false);

    async function getPlayerDemons(playerName: String) {
        return fetch(`${SERVER_URL}/api/player_demons/${playerName}`)
        .then(response => response.json());
    }

    function toggleDemons() {
        showDemons = !showDemons;
    }
    
</script>

<Card.Root class="w-8/12">
    <Card.Root class="flex justify-between items-center p-4">
        <Card.Header>
            <Card.Title>
                    <h1>
                        #{playerRank} - {playerName}
                    </h1>        
            </Card.Title>
            <Card.Description>
                <p>
                    {playerPoints} points
                </p>            
            </Card.Description>
        </Card.Header>
    
        <Button variant="outline" size="icon" onclick={toggleDemons}>
            {#if showDemons}
                <ChevronUp />
            {:else}
                <ChevronDown />
            {/if}
        </Button>
    </Card.Root>
    
    {#if showDemons}
        <PlayerDemons demons_completed={getPlayerDemons(playerName)} />
    {/if}

</Card.Root>