<script>
    import * as Card from "$lib/components/ui/card/index";
    import { Button } from "$lib/components/ui/button/index";
    import { Separator } from "$lib/components/ui/separator/index";
    import { enhance } from '$app/forms';
    import { user } from "../../stores";
    import { checkPermissions } from "$lib/rbacUtils";
    import { PERMISSIONS } from "../../constants";
    export let data;
    export let form;
    let items = data;

    // Search query states
    let searchQueryChange = '';
    let searchQueryDelete = '';

    $: canAddDemon = checkPermissions($user, PERMISSIONS.ADD_DEMON);
    $: canChangeDemonRank = checkPermissions($user, PERMISSIONS.CHANGE_DEMON_RANK);
    $: canDeleteDemon = checkPermissions($user, PERMISSIONS.DELETE_DEMON);

    // Loading states for each form
    let isAddingDemon = false;
    let isChangingRank = false;
    let isDeletingDemon = false;

    // Enhanced form submission handler with loading state
    const handleSubmit = (formType) => {
        return ({ form }) => {
            // Set loading state based on form type
            switch (formType) {
                case 'add':
                    isAddingDemon = true;
                    break;
                case 'change':
                    isChangingRank = true;
                    break;
                case 'delete':
                    isDeletingDemon = true;
                    break;
            }

            return async ({ result, update }) => {
                // Reset loading state after form submission
                switch (formType) {
                    case 'add':
                        isAddingDemon = false;
                        break;
                    case 'change':
                        isChangingRank = false;
                        break;
                    case 'delete':
                        isDeletingDemon = false;
                        break;
                }
                
                // Update the form
                await update();
            };
        };
    };
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
    <!-- Add Demon -->
    {#if canAddDemon}
    <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Add a demon to the list
            </Card.Title>
        </Card.Header>

        <Separator />
        
        <Card.Content>
            <form method="POST" action="?/submitDemonEndpoint" use:enhance={handleSubmit('add')}>
                <p>Enter demon name:</p>
                <input type="text" id="level_name" name="level_name" class="text-input" disabled={isAddingDemon}>
        
                <p>Enter demon rank:</p>
                <input type="number" id="level_rank" name="level_rank" class="text-input" disabled={isAddingDemon}>
                <br><br>
                <Button type="submit" disabled={isAddingDemon}>
                    <span class="button-content">
                        Add Demon
                        {#if isAddingDemon}
                            <span class="spinner"></span>
                        {/if}
                    </span>
                </Button>
            </form>
        </Card.Content>
        {#if form?.formname === "submitDemon"}
            {#if form?.success}
                <p>Successfully added <strong>{form.level_name}</strong> with rank <strong>{form.level_new_rank}</strong></p>
            {/if}
            {#if form?.error}
                <p>{form.error}</p>
            {/if}
        {/if}
    </Card.Root>
    {/if}

    <!-- Change Demon Rank -->
    {#if canChangeDemonRank}
    <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Change a demon rank
            </Card.Title>
        </Card.Header>

        <Separator />

        <Card.Content>
            <form action="?/newChangeDemonRank" method="POST" use:enhance={handleSubmit('change')}>
                <p>Search demon:</p>
                <input type="text" placeholder="Type to search..." bind:value={searchQueryChange} disabled={isChangingRank} />

                <select id="demons-select" name="level_name" disabled={isChangingRank} required>
                    {#await items}
                        <p>Waiting ... </p>
                    {:then levels}
                        {#each levels as level}
                            {#if level.level_name.toLowerCase().includes(searchQueryChange.toLowerCase())}
                                <option value="{level.level_name}">#{level.level_rank_int}. {level.level_name}</option>
                            {/if}
                        {/each} 
                    {:catch error}
                        <p>{error.message}</p>
                    {/await}
                </select>

                <br><br>
                <p>Enter new rank:</p>
                <input type="number" class="text-input" id="level_rank_int" name="level_rank_int" disabled={isChangingRank}>
                <br><br>
                <Button type="submit" disabled={isChangingRank}>
                    <span class="button-content">
                        Change rank
                        {#if isChangingRank}
                            <span class="spinner"></span>
                        {/if}
                    </span>
                </Button>
            </form>
        </Card.Content>
        {#if form?.formname === "changeDemonRank"}
            {#if form?.success}
                <p>Successfully changed rank of <strong>{form.level_name}</strong> to <strong>{form.level_new_rank}</strong> (refresh to see changes)</p>
                {/if}
            {#if form?.error}
                <p>{form.error}</p>
            {/if}
        {/if}




    </Card.Root>
    {/if} 

    <!-- Delete Demon -->
    {#if canDeleteDemon}
    <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Delete a demon from the list
            </Card.Title>
        </Card.Header>

        <Separator />

        <Card.Content>
            <form method="POST" action="?/deleteDemonEndpoint" use:enhance={handleSubmit('delete')}>
                <p>Search demon to remove:</p>
                <input type="text" placeholder="Type to search..." bind:value={searchQueryDelete} disabled={isDeletingDemon} />

                <select id="demons-select" name="level_name" disabled={isDeletingDemon} required>
                    {#await items}
                        <p>Waiting ... </p>
                    {:then levels}
                        {#each levels as level}
                            {#if level.level_name.toLowerCase().includes(searchQueryDelete.toLowerCase())}
                                <option value="{level.level_name}">#{level.level_rank_int}. {level.level_name}</option>
                            {/if}
                        {/each} 
                    {:catch error}
                        <p>{error.message}</p>
                    {/await}
                </select>

                <br><br>
                <Button type="submit" disabled={isDeletingDemon}>
                    <span class="button-content">
                        Delete Demon
                        {#if isDeletingDemon}
                            <span class="spinner"></span>
                        {/if}
                    </span>
                </Button>
            </form>
        </Card.Content>
        {#if form?.formname === "deleteDemon"}
            {#if form?.success}
                <p>Successfully removed demon.</p>
            {/if}
            {#if form?.error}
                <p>{form.error}</p>
            {/if}
        {/if}
    </Card.Root>
    {/if}
</div>