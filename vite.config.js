import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    optimizeDeps: {
        include: ['PenguinMod-SvelteUI'],
        force: true
    },
    server: {
        watch: {
            // Force Vite to watch the linked library files
            ignored: ['!**/node_modules/PenguinMod-SvelteUI/**']
        }
    },
});
