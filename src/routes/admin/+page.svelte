<script>
    import AnnouncementMaker from "./AnnouncementMaker.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index";
    import DemonManager from "./DemonManager.svelte";
    import PlayerManager from "./PlayerManager.svelte";
    import { checkRole } from "$lib/rbacUtils";
    import { ROLES } from "../../constants";
    import { user, isHelper, isLeader, isModerator } from "../../stores";

    export let data;
    export let form;
    
    $user = data.user;
    $isHelper = checkRole($user, ROLES.HELPER);
    $isModerator = checkRole($user, ROLES.MODERATOR);
    $isLeader = checkRole($user, ROLES.LEADER);
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
            <DemonManager data={data.levels} form={form}/>
        </Tabs.Content>
    
        <Tabs.Content value="players">
            <PlayerManager data={data} form={form}/>
        </Tabs.Content>
    
        <Tabs.Content value="manage-announcements">
            <AnnouncementMaker />
        </Tabs.Content>

    </Tabs.Root>
</div>