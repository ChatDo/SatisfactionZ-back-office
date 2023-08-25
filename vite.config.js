import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {

                },
            }
        }),
    ],
    resolve: {
        alias: {
            path: "postcss.config.js",
            url: "postcss.config.js",
            buffer: "postcss.config.js",
            fs: "postcss.config.js",
            http: "postcss.config.js",
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
