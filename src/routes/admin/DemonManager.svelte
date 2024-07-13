<script>
    import * as Card from "$lib/components/ui/card/index";
    import { Button } from "$lib/components/ui/button/index";
    import { Separator } from "$lib/components/ui/separator/index"
    import { enhance } from '$app/forms';
    import { user } from "../../stores";
    import { checkPermissions } from "$lib/rbacUtils";
    import { PERMISSIONS } from "../../constants";
    export let data;
    export let form;
    let items = data;

    $: canAddDemon = checkPermissions($user, PERMISSIONS.ADD_DEMON);
    $: canChangeDemonRank = checkPermissions($user, PERMISSIONS.CHANGE_DEMON_RANK);
    $: canDeleteDemon = checkPermissions($user, PERMISSIONS.DELETE_DEMON);
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
    {#if !canAddDemon && !canChangeDemonRank && !canDeleteDemon}
        <h1>Unauthorized.</h1>
    {/if}

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
            <form method="POST" action="?/submitDemon">
                <p>Enter demon name:</p>
                <input type="text" id="demon-name" name="demon-name" class="text-input">
        
                <p>Enter demon rank:</p>
                <input type="number" id="demon-rank" name="demon-rank" class="text-input">
                <br><br>
                <Button type="submit">Add Demon</Button>
            </form>
        </Card.Content>
        {#if form?.formname === "submitDemon"}
            {#if form?.success}
                <p>Successfully added <strong>{form.level_name}</strong> with rank <strong>{form.level_rank_int}</strong></p>
            {/if}
            {#if form?.error}
                <p>{form.error}</p>
            {/if}
        {/if}
    </Card.Root>
    {/if}

    {#if canChangeDemonRank}
    <!-- Change Demon Rank -->
    <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Change a demon rank
            </Card.Title>
        </Card.Header>

        <Separator />

        <Card.Content>
            <form action="?/changeDemonRank" method="POST">
                <p>Select demon:</p>
                <select id="demons-select" name="level_name" class="">
                    {#await items}
                        <p>Waiting ... </p>
                    {:then levels}
                        {#each levels as level}
                            <option value={level.level_name} id="{level.id}">#{level.level_rank_int}. {level.level_name}</option>
                        {/each} 
                    {:catch error}
                        <p>{error.message}</p>
                    {/await}
                </select>
                <br><br>
                <p>Enter new rank:</p>
                <input type="number" class="text-input" id="level_rank_int" name="level_rank_int">
                <br><br>
                <Button type="submit">Change rank</Button>
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

    {#if canDeleteDemon}
    <!-- Delete Demon -->
    <Card.Root class="w-9/12 flex flex-col items-center">
        <Card.Header>
            <Card.Title>
                Delete a demon from the list
            </Card.Title>
        </Card.Header>

        <Separator />

        <Card.Content>
            <form method="POST" action="?/deleteDemon">
                <p>Select demon to remove:</p>
                <select id="demons-select" name="demon_data">
                    {#await items}
                        <p>Waiting ... </p>
                    {:then levels}
                        {#each levels as level}
                            <option value="{level.level_rank_int},{level.level_name}">#{level.level_rank_int}. {level.level_name}</option>
                        {/each} 
                    {:catch error}
                        <p>{error.message}</p>
                    {/await}
                </select>
                <br><br>
                <Button type="submit">Delete Demon</Button>
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
