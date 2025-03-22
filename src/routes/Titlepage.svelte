<script>
    /** @type {{titleName: any, description: any}} */
    let { titleName, description } = $props();
</script>

<style>
    .title-container {
        background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("$lib/images/titlepage_background.png");
        background-size: cover;
        background-position: center;
        width: 100vw; /* Ensure it covers the viewport width */
        min-width: 100vw; /* Ensure it covers the viewport height */
    }
</style>

<div class="title-container flex flex-col items-center justify-center text-center p-8 sm:p-12 md:p-16 lg:p-24 xl:p-36 text-white">
    <h1 class="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">{titleName}</h1>
    <p class="mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">{description}</p>
</div>
