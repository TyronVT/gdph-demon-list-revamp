// See https://kit.svelte.dev/docs/types#app

import type { PocketbaseUser } from "./types/PocketbaseUser";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: PocketbaseUser;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
