<script lang="ts">
    import { SERVER_URL } from "../../config";
    import { Button } from "$lib/components/ui/button/index";
    import { ChevronDown } from 'lucide-svelte';
    import { ChevronUp } from "lucide-svelte";

    import * as Card from "$lib/components/ui/card/index";
	import PlayerDemons from "./PlayerDemons.svelte";
	import Separator from "$lib/components/ui/separator/separator.svelte";

    interface Props {
        playerName: any;
        playerPoints: any;
        playerRank: any;
        hardestDemon: any;
    }

    let { playerName, playerPoints, playerRank, hardestDemon }: Props = $props();
    
    let showDemons = $state(false);

    async function getPlayerDemons(playerName: String) {
        return fetch(`${SERVER_URL}/api/player_demons/${playerName}`)
        .then(response => response.json());
    }

    function toggleDemons() {
        showDemons = !showDemons;
    }
    
</script>

<Card.Root class="w-4/6">
    <Card.Root class="flex justify-between items-center">
        <Card.Header>
            <Card.Title>
                    <h1>
                        #{playerRank} - {playerName}
                    </h1>        
            </Card.Title>
            <Card.Description>
                Hardest Demon:
                <b>{hardestDemon}</b>
                <Separator class="my-1"/>
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