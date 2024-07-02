<script>
    import Announcement from "./Announcement.svelte";
    import Comingsoon from "./Comingsoon.svelte";
	import HomeInfo from "./HomeInfo.svelte";
    import Titlepage from "./Titlepage.svelte";
</script>


<Titlepage titleName="GDPH Demonlist" description="Welcome to the GDPH Demonlist!" />
<br><br>
<div class="sm:block m:flex lg:flex xl:flex 2xl:flex pl-20 pr-20 w-screen">
    <div class="w-4/6">
        <Announcement />
    </div>

    <div class="w-2/6 flex flex-col items-center gap-1">
        <HomeInfo />
    </div>
</div>