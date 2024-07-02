<script>
    import AnnouncementMaker from "./AnnouncementMaker.svelte";
    import * as Tabs from "$lib/components/ui/tabs/index";
    import DemonManager from "./DemonManager.svelte";
    import PlayerManager from "./PlayerManager.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

    export let data;
    export let form;

</script>

<div class="w-full flex flex-col items-center">

    <Tabs.Root value="demons" class="xl:w-9/12 sm:text-xs 2xl:text-xl">
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