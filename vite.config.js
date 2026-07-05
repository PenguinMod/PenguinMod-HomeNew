import path from 'path';

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    optimizeDeps: {
        include: [
            'highlight.js', 'lottie-web',
            'penguinmod',
        ],
        force: true
    },
    build: {
        commonjsOptions: {
            include: [
                /node_modules\/penguinmod/,
            ],
            // This addresses the "default" export issue by allowing 
            // these packages to be transformed into valid ESM
            transformMixedEsModules: true,
            include: [/node_modules/]
        },
    },
    ssr: {
        // Force these packages to be processed as CJS
        noExternal: ['highlight.js', 'lottie-web'],
        external: [
            'penguinmod'
        ],
    },
});
