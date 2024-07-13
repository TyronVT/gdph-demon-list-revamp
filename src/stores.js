import { writable } from "svelte/store";

export const user = writable(undefined);
export const isHelper = writable(false);
export const isModerator = writable(false);
export const isLeader = writable(false);
export const isDarkMode = writable(true);