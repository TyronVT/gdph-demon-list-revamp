import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'static']
	},
	optimizeDeps: {
		include: ['src/routes/**/+*.{js,ts,svelte}','src/hooks*.{js,ts}']
	}
});
