<script>
    import AnnouncementMaker from "./AnnouncementMaker.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index";
    import { checkPermissions } from "$lib/rbacUtils";
    import { PERMISSIONS } from "../../constants";
    import { user } from "../../stores";
    export let data;
    export let form;
    
    $user = data.user;
    
    let canManageDemons = (
        checkPermissions($user, PERMISSIONS.ADD_DEMON) || 
        checkPermissions($user, PERMISSIONS.CHANGE_DEMON_RANK) || 
        checkPermissions($user, PERMISSIONS.DELETE_DEMON)
    );

    let canManagePlayers = (
        checkPermissions($user, PERMISSIONS.ADD_PLAYER) || 
        checkPermissions($user, PERMISSIONS.ADD_DEMON_TO_PLAYER) ||
        checkPermissions($user, PERMISSIONS.DELETE_PLAYER)
    )
    
    let demonManager; 
    if (canManageDemons) {
        demonManager = import('./DemonManager.svelte');
    }

    let playerManager;
    if (canManagePlayers) {
        playerManager = import('./PlayerManager.svelte');
    }

</script>

<div class="w-full flex flex-col items-center">
    <h1>Signed in as: {data.user.email} </h1>
    <h2>Role: {data.user.role}</h2>
    <Tabs.Root value="" class="xl:w-9/12 sm:text-xs 2xl:text-xl">
        <Tabs.List class="grid w-full grid-cols-3">
            <Tabs.Trigger value="demons">Manage Demons</Tabs.Trigger>
            <Tabs.Trigger value="players">Manage Players</Tabs.Trigger>
            <Tabs.Trigger value="manage-announcements">Manage Announcements</Tabs.Trigger>
        </Tabs.List>
       
        <Tabs.Content value="demons">
            {#if demonManager}
                {#await demonManager then { default: DemonManager }}
                    {#key data.levels}
                        <DemonManager data={data.levels} form={form}/>
                    {/key}
                {/await}
            {:else}
                <p>Unauthorized.</p>
            {/if}
        </Tabs.Content>
            
        <Tabs.Content value="players">
            {#if playerManager}
                {#await playerManager then { default: PlayerManager }} 
                    {#key data}
                        <PlayerManager data={data} form={form}/>
                    {/key}
                {/await}
            {:else}
                <p>Unauthorized.</p> 
            {/if}
        </Tabs.Content>
    
        <Tabs.Content value="manage-announcements">
            {#key data}
                <AnnouncementMaker data={data.announcements}/>
            {/key}
        </Tabs.Content>

    </Tabs.Root>
</div>