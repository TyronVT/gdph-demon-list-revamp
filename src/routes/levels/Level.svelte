<script lang="ts">
    import { X } from "lucide-svelte";
    import { Loader2 } from "lucide-svelte";
    import { SERVER_URL } from "../../config";
    import { Button } from "$lib/components/ui/button/index";
    import { ChevronDown } from 'lucide-svelte';
    import { ChevronUp } from "lucide-svelte";
    import * as Card from "$lib/components/ui/card/index";
	import LeveLeaderboard from "./LeveLeaderboard.svelte";
    import { getThumbnails } from "$lib/helpers/getThumbnails";

    interface Props {
        levelName: any;
        levelPoints: any;
        levelRank: any;
        listRequirement: any;
        thumbnail: any;
    }

    let {
        levelName,
        levelPoints,
        levelRank,
        listRequirement,
        thumbnail,
    }: Props = $props();
    
    let showLeaderboard = $state(false);

    function toggleLeaderboard() {
        showLeaderboard = !showLeaderboard;
    }

    async function fetchLeaderboard(levelName: string) {
        return await fetch(`${SERVER_URL}/api/level_leaderboard/${levelName}`)
        .then(response => response.json());
    }
    
    function urlParse(url: string){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11) ? match[7] : false
    }
</script>

<Card.Root class="w-full sm:w-8/12">
    <Card.Root class="flex items-center justify-center">
        <div class="flex items-center w-5/6">
            {#if thumbnail === ""}
                <div class="flex flex-col justify-center items-center">
                    <X />
                    <p class="text-center">No thumbnail available.</p>
                </div>
            {:else}
                <img 
                class="w-1/4"
                src="https://i1.ytimg.com/vi/{urlParse(thumbnail).toString()}/hqdefault.jpg" 
                alt="Levelimg" 
                />
            {/if}
            <Card.Header>
                <Card.Title>
                    <h1>#{levelRank} - {levelName}</h1>        
                </Card.Title>
                <Card.Description>
                    <p>{levelPoints} points</p>
                    {#if levelRank <= 75}
                    <p>List Requirement: <span class="font-bold">{listRequirement}%</span></p>
                    {/if}
                </Card.Description>
            </Card.Header>
        </div>
            
        <div class="flex justify-center items-center">
            <Button variant="outline" size="icon" onclick={toggleLeaderboard}>
                {#if showLeaderboard}
                    <ChevronUp />
                {:else}
                    <ChevronDown />
                {/if}
            </Button>
        </div>
    </Card.Root>
    
    {#if showLeaderboard}
        <LeveLeaderboard levelName={levelName} />
    {/if}

</Card.Root>