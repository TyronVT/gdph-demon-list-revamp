<script lang="ts">
    import { onMount } from 'svelte';
    import * as Menubar from "$lib/components/ui/menubar";
    import { Button } from "$lib/components/ui/button/index";
    import { ModeWatcher } from "mode-watcher";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import { toggleMode } from "mode-watcher";
    import "../app.css";

    let isMobileMenuOpen = false;

    const toggleMobileMenu = () => {
        isMobileMenuOpen = !isMobileMenuOpen;
    };

    // Optional: Close the mobile menu when the window is resized to a larger screen
    const handleResize = () => {
        if (window.innerWidth >= 768) {
            isMobileMenuOpen = false;
        }
    };

    onMount(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
    
    :global(body) {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-family: 'Outfit';
        overflow-x: hidden;
    }

    .mobile-sidenav {
        width: 75%;
        position: fixed;
        top: 0;
        left: 0;
        overflow-x: hidden;
        transition: 0.5s all;
        transform: translateX(-100%);
    }

    .mobile-sidenav.true {
        transform: translateX(0%);
    }
</style>

<ModeWatcher />

<div class="flex max-w-screen-xl mx-auto justify-between p-5 text-2xl">
    <div class="flex items-center">
        <a href="/">
            <h2 class="font-bold">GDPH Demonlist</h2>
        </a>
    </div>

    <!-- Desktop Nav Bar -->
    <Menubar.Root class="hidden md:flex md:items-center justify-end border-opacity-0">
        <Menubar.Menu>
            <Button variant="ghost" href="/">Home</Button>
            
            <Menubar.Trigger>
                Top 150 List
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
            </Menubar.Trigger>
            <Menubar.Content>
                <Menubar.Item>
                    <a href="/levels/main">
                        <p>Main List (1-75)</p>
                    </a>
                </Menubar.Item>
                <Menubar.Item>
                    <a href="/levels/extended">
                        <p>Extended List (76-150)</p>
                    </a>
                </Menubar.Item>
                <Menubar.Item>
                    <a href="/levels/legacy">
                        <p>Legacy List</p>
                    </a>
                </Menubar.Item>
                <Menubar.Item>
                    <p>Pending List Changes</p>
                </Menubar.Item>
                <Menubar.Item>
                    <p>Notable Progress</p>
                </Menubar.Item>
            </Menubar.Content>
    
            <Button variant="ghost" href="/leaderboards">Leaderboards</Button>
            <Button variant="ghost">Changelongs</Button>
            <Button variant="ghost">Guidelines</Button>
            <Button variant="ghost">About Us</Button>
            <Button variant="ghost" href="/login">Sign In</Button>
            <Button on:click={toggleMode} variant="ghost" size="icon">
                <Sun
                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                />
                <Moon
                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </Menubar.Menu>
    </Menubar.Root>

    <!-- Mobile Menu Button -->
    <div class="md:hidden flex items-center">
        <button class="p-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring" on:click={toggleMobileMenu}>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
    
</div>

<!-- Mobile Menu -->
{#if isMobileMenuOpen}
    <div class="mobile-sidenav {isMobileMenuOpen ? true : false} bg-black h-screen nmd:hidden flex flex-col items-start space-y-4 border-t p-10">
        <Menubar.Root class="flex flex-col items-start space-y-4">
            <Menubar.Menu>
                <Button variant="ghost" href="/">Home</Button>
                <Menubar.Trigger>
                    Top 150 List
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                </Menubar.Trigger>
                <Menubar.Content>
                    <Menubar.Item>
                        <a href="/levels/main">
                            <p>Main List (1-75)</p>
                        </a>
                    </Menubar.Item>
                    <Menubar.Item>
                        <p>Extended List (76-150)</p>
                    </Menubar.Item>
                    <Menubar.Item>
                        <p>Legacy List</p>
                    </Menubar.Item>
                    <Menubar.Item>
                        <p>Pending List Changes</p>
                    </Menubar.Item>
                    <Menubar.Item>
                        <p>Notable Progress</p>
                    </Menubar.Item>
                </Menubar.Content>
                <Button variant="ghost" href="/leaderboards">Leaderboards</Button>
                <Button variant="ghost">Changelongs</Button>
                <Button variant="ghost">Guidelines</Button>
                <Button variant="ghost">About Us</Button>
                <Button variant="ghost">Sign In</Button>
                <Button on:click={toggleMode} variant="ghost" size="icon">
                    <Sun
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </Menubar.Menu>
        </Menubar.Root>
    </div>
{/if}

<slot></slot>
