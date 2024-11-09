<script>
    import * as Card from "$lib/components/ui/card/index";
    import { Button } from "$lib/components/ui/button/index";
    import { Separator } from "$lib/components/ui/separator/index"
    import { enhance } from '$app/forms';
    import { user } from "../../stores";
    import { checkPermissions } from "$lib/rbacUtils";
    import { PERMISSIONS } from "../../constants";
	import { SERVER_URL } from "../../config";
    export let data;
    export let form;

    let items = data;
    let selectedPlayer = '';
    let playerLevels = [];
    let isLoadingLevels = false;

    async function getSpecificPlayerLevels(playerName) {
        if (!playerName) return [];
        isLoadingLevels = true;
        try {
            const response = await fetch(`${SERVER_URL}/api/player_demons/${playerName}`);
            if (!response.ok) {
                console.log("Not ok.");
                isLoadingLevels = false;
                return [];
            }
            const jsonData = await response.json();
            var levels = [];
            levels = levels.concat(jsonData["Extended Demons"])
                         .concat(jsonData["Main Demons"])
                         .concat(jsonData["In Progress"])
                         .concat(jsonData["Legacy List"]);
            isLoadingLevels = false;
            return levels.sort((a, b) => {
                if (a.level_name < b.level_name) return -1;
                if (a.level_name > b.level_name) return 1;
                return 0;
            });
        } catch (error) {
            console.error('Error fetching player levels:', error);
            isLoadingLevels = false;
            return [];
        }
    }
    // Update playerLevels when selectedPlayer changes
    $: {
        if (selectedPlayer) {
            getSpecificPlayerLevels(selectedPlayer).then(levels => {
                playerLevels = levels;
            });
        } else {
            playerLevels = [];
        }
    }
    $: canAddPlayer = checkPermissions($user, PERMISSIONS.ADD_PLAYER);
    $: canAddDemonToPlayer = checkPermissions($user, PERMISSIONS.ADD_DEMON_TO_PLAYER);
    $: canDeletePlayer = checkPermissions($user, PERMISSIONS.DELETE_PLAYER);
    $: canRemoveDemonFromPlayer = checkPermissions($user, PERMISSIONS.REMOVE_DEMON_FROM_PLAYER);

</script>

<style>
    input, select {
        padding: 0.2rem;
        color: var(--color);
        border: 2px solid grey;
        border-radius: 0.3rem;
    }
</style>

<div class="lg:p-10 flex flex-col gap-10 items-center">
    {#if !canAddPlayer && !canAddDemonToPlayer && !canDeletePlayer}
        <h1>Unauthorized.</h1>
    {/if}
    <!-- Add Player-->
    {#if canAddPlayer}
    <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Add a player
            </Card.Title>
        </Card.Header>

        <Separator />

        <Card.Content class="flex flex-col">
            <p>Enter player name:</p>
            <form action="?/addPlayer" method="POST" use:enhance>
                <input type="text" id="player-name" name="player_name" class="text-input">
                <br><br>
                <Button type="submit">Add player</Button>
            </form>
        </Card.Content>

        {#if form?.formname === "addPlayer"}
            {#if form?.success}
                <p>Successfully added <strong>{form.player_name}</strong> to players.</p>
            {/if}
            {#if form?.error}
                <p>{form.error} {form.actual_error}</p>
            {/if}
        {/if}
    </Card.Root>
    {/if}

    <!-- Add demon to player -->
    {#if canAddDemonToPlayer}
    <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Add demon to player
            </Card.Title>
        </Card.Header>

        <Separator />
        
        <Card.Content>
            <form method="POST" action="?/addDemonToPlayer" use:enhance>
                <p>Select player</p>
                <select id="players-select" name="player_name">
                    {#await items.players}
                    <p> Loading players... </p>
                    {:then data}
                        {#each data as player}
                            <option value="{player.player_name}" id="{player.id}">{player.player_name}</option>
                        {/each}
                    {/await}
                </select>
            
                <p>Select demon</p>
                <select id="demons-select" name="level_name">
                    {#await items.levels}
                        <p>Waiting ... </p>
                    {:then levels}
                        {#each levels as level}
                            <option value={level.level_name} id="{level.id}">#{level.level_rank_int}. {level.level_name}</option>
                        {/each} 
                    {:catch error}
                        <p>{error.message}</p>
                    {/await}
                </select>
                
                <p>Enter percentage completed (0 - 100)</p>
                <input type="number" class="text-input" id="progress" name="percent_completed">
            
                <p>Enter youtube URL:</p>
                <input type="url" class="text-input" id="url" name="youtube_video">
                <br>
    
                <p>Enter date completed (MM/DD/YYYY)</p>
                <input type="datetime-local" class="text-input" id="date" name="completed_at">
                <br><br>
                <Button type="submit">Add Demon to Player</Button>
            </form>
        </Card.Content>

        {#if form?.formname === "addDemonToPlayer"}
            {#if form?.success}
                <p class="success">Successfully added <strong>{form.level_name}</strong> to <strong>{form.player_name}</strong></p>
            {/if}
            {#if form?.error}
                <p>{form.error}</p>
            {/if}
        {/if}
    </Card.Root>
    {/if}

    <!-- Remove player -->
    {#if canDeletePlayer}
    <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Remove a player
            </Card.Title>
        </Card.Header>

        <Separator />

        <Card.Content class="flex flex-col">
            <p>Enter player name:</p>
            <form action="?/removePlayer" method="POST" use:enhance>
                <input type="text" id="player-name" name="player_name" class="text-input">
                <br><br>
                <Button type="submit">Remove player</Button>
            </form>
        </Card.Content>
        
        {#if form?.formname === "removePlayer"}
            {#if form?.success}
                <p>Successfully removed <strong>{form.player_name}</strong> from players.</p>
            {/if}
            {#if form?.error}
                <p>{form.error}</p>
            {/if}
        {/if}
    </Card.Root>
    {/if}

    <!-- Remove demon from player -->
     {#if canRemoveDemonFromPlayer}
     <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Remove demon from player
            </Card.Title>
        </Card.Header>
        
        <Separator />

        <Card.Content class="flex flex-col">
            <form action="?/removeDemonFromPlayer" method="POST" use:enhance>
                <div class="select-container">
                    <p class="select-label">Select Player:</p>
                    <select 
                        id="players-select" 
                        name="player_name"
                        bind:value={selectedPlayer}
                    >
                        <option value="">Choose a player...</option>
                        {#await data.players}
                            <option disabled>Loading players...</option>
                        {:then data}
                            {#each data as player}
                                <option value={player.player_name}>
                                    {player.player_name}
                                </option>
                            {/each}
                        {/await}
                    </select>
                </div>

                <div class="select-container">
                    <p class="select-label">Select Demon to Remove:</p>
                    <select 
                        id="level-select" 
                        name="level_name"
                        disabled={!selectedPlayer || isLoadingLevels}
                    >
                        {#if isLoadingLevels}
                            <option disabled>Loading demons...</option>
                        {:else}
                            {#each playerLevels as level}
                                <option value={level.level_name}>
                                    {level.level_name}
                                </option>
                            {/each}
                        {/if}
                    </select>
                </div>
                
                <br>
                <Button 
                    type="submit" 
                    disabled={!selectedPlayer || !playerLevels.length}
                >
                    Remove Demon from Player
                </Button>
            </form>
            {#if form?.formname === "removeDemonFromPlayer"}
                {#if form?.success}
                    <p class="success"><strong>{form.level_name}</strong> removed from <strong>{form.player_name}</strong></p>
                {/if}
                {#if form?.error}
                    <p>{form.error}</p>
                {/if}
            {/if}
        </Card.Content>
    </Card.Root>
     {/if}
</div>