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

    // Loading states for each form
    let isAddingPlayer = false;
    let isAddingDemonToPlayer = false;
    let isRemovingPlayer = false;
    let isRemovingDemonFromPlayer = false;

    // Search terms for filtering
    let playerSearch = '';
    let demonSearch = '';
    let removePlayerSearch = '';

    // Filter function for search
    const filterItems = (items, search) => {
        return items.filter(item => item.player_name.toLowerCase().includes(search.toLowerCase()));
    };
    
    $: if (filterItems(data.players, playerSearch).length === 1) {
    selectedPlayer = filterItems(data.players, playerSearch)[0].player_name;
    }

    const filterDemons = (levels, search) => {
        return levels.filter(level => level.level_name.toLowerCase().includes(search.toLowerCase()));
    };

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

    // Enhanced form submission handler with loading state
    const handleSubmit = (formType) => {
        return ({ form }) => {
            // Set loading state based on form type
            switch (formType) {
                case 'addPlayer':
                    isAddingPlayer = true;
                    break;
                case 'addDemonToPlayer':
                    isAddingDemonToPlayer = true;
                    break;
                case 'removePlayer':
                    isRemovingPlayer = true;
                    break;
                case 'removeDemonFromPlayer':
                    isRemovingDemonFromPlayer = true;
                    break;
            }

            return async ({ result, update }) => {
                // Reset loading state after form submission
                switch (formType) {
                    case 'addPlayer':
                        isAddingPlayer = false;
                        break;
                    case 'addDemonToPlayer':
                        isAddingDemonToPlayer = false;
                        break;
                    case 'removePlayer':
                        isRemovingPlayer = false;
                        break;
                    case 'removeDemonFromPlayer':
                        isRemovingDemonFromPlayer = false;
                        break;
                }
                
                await update();
            };
        };
    };

    // Update playerLevels when selectedPlayer changes
    $: if (selectedPlayer) {
            getSpecificPlayerLevels(selectedPlayer).then(levels => {
                playerLevels = levels;
            });
        } else {
            playerLevels = [];
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

    .spinner {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #3498db;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-left: 0.5rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .button-content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>

<div class="lg:p-10 flex flex-col gap-10 items-center">
    {#if !canAddPlayer && !canAddDemonToPlayer && !canDeletePlayer}
        <h1>Unauthorized.</h1>
    {/if}
    
    <!-- Add Player -->
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
            <form action="?/addPlayer" method="POST" use:enhance={handleSubmit('addPlayer')}>
                <input type="text" id="player-name" name="player_name" class="text-input" disabled={isAddingPlayer}>
                <br><br>
                <Button type="submit" disabled={isAddingPlayer}>
                    <span class="button-content">
                        Add player
                        {#if isAddingPlayer}
                            <span class="spinner"></span>
                        {/if}
                    </span>
                </Button>
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
            <form method="POST" action="?/addDemonToPlayer" use:enhance={handleSubmit('addDemonToPlayer')}>
                <p>Search player</p>
                <input type="text" bind:value={playerSearch} placeholder="Search player..." />

                <select id="players-select" name="player_name" disabled={isAddingDemonToPlayer}>
                    {#each filterItems(items.players, playerSearch) as player}
                        <option value="{player.player_name}" id="{player.id}">{player.player_name}</option>
                    {/each}
                </select>

                <p>Search demon</p>
                <input type="text" bind:value={demonSearch} placeholder="Search demon..." />

                <select id="demons-select" name="level_name" disabled={isAddingDemonToPlayer}>
                    {#each filterDemons(items.levels, demonSearch) as level}
                        <option value={level.level_name} id="{level.id}">#{level.level_rank_int}. {level.level_name}</option>
                    {/each}
                </select>
                
                <p>Enter percentage completed (0 - 100)</p>
                <input type="number" class="text-input" id="progress" name="percent_completed">
            
                <p>Enter youtube URL:</p>
                <input type="url" class="text-input" id="url" name="youtube_video">
                <br>
    
                <p>Enter date completed (MM/DD/YYYY)</p>
                <input type="datetime-local" class="text-input" id="date" name="completed_at">
                <br><br>
                
                <Button type="submit" disabled={isAddingDemonToPlayer}>Add Demon to Player</Button>
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

        <Card.Content>
            <p>Search player to remove</p>
            <input type="text" bind:value={removePlayerSearch} placeholder="Search player..." />

            <form action="?/removePlayer" method="POST" use:enhance={handleSubmit('removePlayer')}>
                <select name="player_name" disabled={isRemovingPlayer}>
                    {#each filterItems(items.players, removePlayerSearch) as player}
                        <option value="{player.player_name}">{player.player_name}</option>
                    {/each}
                </select>
                <Button type="submit" disabled={isRemovingPlayer}>Remove player</Button>
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

        <Card.Content>
            <p>Search player</p>
            <form action="?/removeDemonFromPlayer" method="POST" use:enhance={handleSubmit('removeDemonFromPlayer')}>
                <input type="text" bind:value={playerSearch} placeholder="Search player..." />
    
                <select name="player_name" bind:value={selectedPlayer} disabled={isRemovingDemonFromPlayer}>
                    {#each filterItems(data.players, playerSearch) as player}
                        <option value={player.player_name}>{player.player_name}</option>
                    {/each}
                </select>
    
                {#if selectedPlayer}
                    <p>Search demon to remove</p>
                    <input type="text" bind:value={demonSearch} placeholder="Search demon..." />
    
                    <select name="level_name" disabled={!selectedPlayer || isLoadingLevels || isRemovingDemonFromPlayer}>
                        {#each filterDemons(playerLevels, demonSearch) as level}
                            <option value={level.level_name}>{level.level_name}</option>
                        {/each}
                    </select>
                {/if}
                <Button type="submit" disabled={!selectedPlayer || !playerLevels.length || isRemovingDemonFromPlayer}>Remove Demon from Player</Button>
            </form>
        </Card.Content>
        {#if form?.formname === "removeDemonFromPlayer"}
            {#if form?.success}
                <p>Successfully removed <strong>{form.level_name}</strong> from {form.player_name}.</p>
            {/if}
            {#if form?.error}
                <p>{form.error}</p>
            {/if}
        {/if}
    </Card.Root>
    {/if}
</div>