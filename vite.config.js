import path from 'path';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    optimizeDeps: {
        include: [
            'penguinmod',
        ],
        force: true
    },
    build: {
        commonjsOptions: {
            include: [
                /node_modules\/penguinmod/,
            ]
        },
    },
    ssr: {
        external: [
            'penguinmod'
        ],
    }
});
