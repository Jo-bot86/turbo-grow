import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        open: true,
        host: true,
    },
    // ✨ Wichtig für React Router:
    build: {
        outDir: 'dist',
        sourcemap: false,
    },
    // Diese Zeile sorgt dafür, dass /login, /register usw. an index.html weitergeleitet werden
    //appType: 'spa' sagt Vite, dass es sich um eine Single Page Application handelt,
    // und alle Routen an index.html geschickt werden sollen.
    appType: 'spa',
})
