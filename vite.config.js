import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    base: "/vitePWA/",
    plugins: [VitePWA({
        mode: "development",
        base: "/vitePWA/",
        filename: "sw.js",
        includeAssets: ["/favicon.svg"],
        strategies: "injectManifest",
        registerType: 'autoUpdate',
        injectRegister: "inline",
        manifest: {
            "name": "Vite PWA",
            "short_name": "VPWA",
            "start_url": "index.html",
            "display": "standalone",
            "background_color": "#fff",
            "description": "...",
            "icons": [
                {
                    "src": "icons/manifest-icon-192.maskable.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "any"
                },
                {
                    "src": "icons/manifest-icon-192.maskable.png",
                    "sizes": "192x192",
                    "type": "image/png",
                    "purpose": "maskable"
                },
                {
                    "src": "icons/manifest-icon-512.maskable.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "any"
                },
                {
                    "src": "icons/manifest-icon-512.maskable.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                }
            ]
        }
    })]
})