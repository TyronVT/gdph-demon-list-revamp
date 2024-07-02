<script>
    import { SERVER_URL } from "../serverselector";
    import { Separator } from "$lib/components/ui/separator/index"
    import Pocketbase from "pocketbase";
    const pb = new Pocketbase(SERVER_URL);

    async function getAnnouncements() {
        const records = await pb.collection('announcements').getFullList({
            sort: '-created',
        });
        return records
    }
</script>

{#await getAnnouncements()}
    <p>Fetching Announcements...</p>
{:then data}
    {#if data.length < 1}
        <p>No announcements found...</p>
    {:else}
        {#each data as record}
            <div class="announcement space-y-2 block">
                {@html record.richhtml}
            </div>
            <Separator class="my-4" />
        {/each}
    {/if}
    
{:catch error}
        <p>{error.message}</p>
{/await}