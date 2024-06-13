<script lang="ts">
    import { onMount } from 'svelte';
    import * as Menubar from "$lib/components/ui/menubar";
    import { Button } from "$lib/components/ui/button/index";
    import { ModeWatcher, toggleMode } from "mode-watcher";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    import { ChevronDown } from 'lucide-svelte';
    import { ChevronUp } from 'lucide-svelte';
    import { PanelLeftClose } from 'lucide-svelte';

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

    let isListCategoryRevealed = false;
    const toggleListCategories= () => {
        isListCategoryRevealed = !isListCategoryRevealed;
    };

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
        background-color: var(--background);
        color: var(--text);
        transition: background-color 0.3s, color 0.3s;
    }

    :global(.dark) {
        --background: black;
        --text: white;
    }

    :global(.light) {
        --background: white;
        --text: black;
    }

    .mobile-sidenav {
        width: 75%;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        overflow-x: hidden;
        transition: transform 0.5s ease, background-color 0.3s, color 0.3s;
        transform: translateX(-100%);
        background-color: var(--background);
        color: var(--text);
    }

    .mobile-sidenav.true {
        transform: translateX(0%);
    }

    .theme-toggle-button {
        position: relative;
    }

    .theme-toggle-button .moon-icon {
        position: absolute;
        top: 0;
        left: 0;
    }

    .demons-category.true {
        display: block;
    }

    .demons-category {
        display: none;
    }
</style>

<ModeWatcher defaultMode={"dark"} />

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
            <Button on:click={toggleMode} variant="ghost" size="icon" class="theme-toggle-button">
                <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon class="moon-icon h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
<div class="h-screen w-screen backdrop-brightness-50 top-0 left-0 fixed">
    <aside id="sidebar" class="fixed left-0 top-0 z-40 h-screen w-64 transition-transform" aria-label="Sidebar">
      <div class="flex h-full flex-col overflow-y-auto border-r px-3 py-4 bg-black">
        <div href="#" class="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white justify-between">
          <span class="ml-3 text-base font-semibold">GDPH Demonlist</span>
          <button on:click={toggleMobileMenu}>
              <PanelLeftClose/>
          </button>
        </div>
        <ul class="space-y-2 text-sm font-medium">

          <li>
            <a href="/" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-home" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span class="ml-3 flex-1 whitespace-nowrap">Home</span>
            </a>
          </li>

          <li>
            <a href="#" on:click={toggleListCategories} class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                {#if isListCategoryRevealed}
                    <ChevronUp />
                {:else}
                    <ChevronDown />
                {/if}
                <span class="ml-3 flex-1 whitespace-nowrap">Top 150 List</span>
            </a>

            <ul class="demons-category {isListCategoryRevealed ? true : false}">
                <a href="/levels/main" class="flex items-center rounded-lg px-6 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-home" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span class="ml-3 flex-1 whitespace-nowrap">Main List (1 - 75)</span>
                </a>

                <a href="/levels/extended" class="flex items-center rounded-lg px-6 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-home" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span class="ml-3 flex-1 whitespace-nowrap">Extended List (76 - 150)</span>
                </a>

                <a href="/levels/legacy" class="flex items-center rounded-lg px-6 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-home" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span class="ml-3 flex-1 whitespace-nowrap">Legacy List</span>
                </a>

                <a href="#" class="flex items-center rounded-lg px-6 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-home" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span class="ml-3 flex-1 whitespace-nowrap">Notable Progress</span>
                </a>
            </ul>

          </li>

          <li>
            <a href="#" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-home" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
              <span class="ml-3 flex-1 whitespace-nowrap">Leaderboards</span>
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-home" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16.5 9.4 7.55 4.24" />
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.29 7 12 12 20.71 7" />
                <line x1="12" x2="12" y1="22" y2="12" />
              </svg>
              <span class="ml-3 flex-1 whitespace-nowrap">Changelogs</span>
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-settings" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span class="ml-3 flex-1 whitespace-nowrap">Guidelines</span>
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-settings" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span class="ml-3 flex-1 whitespace-nowrap">About Us</span>
            </a>
          </li>

          <li>
            <a href="#" class="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lucide lucide-settings" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                  </svg>
                  
              <span class="ml-3 flex-1 whitespace-nowrap">Sign In</span>
            </a>
          </li>
        </ul>
        <!-- <div class="mt-auto flex">
          <div class="flex w-full justify-between">
            <span class="text-sm font-medium text-black dark:text-white">email@example.com</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-roledescription="more menu" fill="none" stroke="currentColor" stroke-width="2" class="h-5 w-5 text-black dark:text-white lucide lucide-more-horizontal" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </div>
        </div> -->
      </div>
    </aside>
</div>
{/if}
<slot></slot>
