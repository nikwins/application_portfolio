// https://nuxt.com/docs/api/configuration/nuxt-config
import { fetchStories } from './composables/fetchStories'
const seo = {
    title: process.env.SEO_TITLE,
    description: process.env.SEO_DESCRIPTION,
    website: process.env.BASE_URL + '/',
    image: process.env.BASE_URL && process.env.SEO_BANNER_REL_PATH ? process.env.BASE_URL + process.env.SEO_BANNER_REL_PATH : ''
}
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Niklas Wingender | Web Developer',
            meta: [
                { name: 'format-detection', content: 'telephone=no' },

                // Favicon
                { name: 'msapplication-TileColor', content: '#2dd4bf' },
                { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
                { name: 'theme-color', content: '#ffffff' },

                // SEO
                { name: 'description', content: seo.description },
                
                // Open Graph / Facebook
                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: seo.website },
                { property: 'og:title', content: seo.title },
                { property: 'og:description', content: seo.description },
                { property: 'og:image', content: seo.image },
                
                // Twitter / X
                { property: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                { property: 'twitter:url', name: 'twitter:url', content: seo.website },
                { property: 'twitter:title', name: 'twitter:title', content: seo.title },
                { property: 'twitter:description', name: 'twitter:description', content: seo.description },
                { property: 'twitter:image', name: 'twitter:image', content: seo.image },
            ],
            link: [
                // Favicon
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
                { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon/favicon-32x32.png' },
                { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon/favicon-16x16.png' },
                { rel: 'manifest', href: '/favicon/site.webmanifest' },
                { rel: 'mask-icon', color: '#2dd4bf', href: '/favicon/safari-pinned-tab.svg' },
                { rel: 'shortcut icon', href: '/favicon/favicon.ico' },

                // Storyblok Preconnects
                { rel: 'preconnect', href: 'https://a.storyblok.com' },
                { rel: 'preconnect', href: 'https://a2.storyblok.com' },
                { rel: 'preconnect', href: 'https://api.storyblok.com' },
            ],
            htmlAttrs: {
                lang: 'de',
                class: 'scroll-smooth',
                prefix: 'og: https://ogp.me/ns#'
            },
            bodyAttrs: {
                class: 'bg-bodyBgColor text-bodyTextColor text-base'
            },
        }
    },
    ssr: process.env.NODE_ENV === 'production' ? true : false,
    runtimeConfig: {
        public: {
            NODE_ENV: process.env.NODE_ENV,
            PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
            PRODUCTION_TOKEN: process.env.STORYBLOK_TOKEN,
        }
    },
    nitro: {
        compressPublicAssets: true,
    },  
    hooks: {
        async 'nitro:config'(nitroConfig) {
            if (!nitroConfig || nitroConfig.dev) {
                return
            }
            const token = process.env.STORYBLOK_TOKEN
        
            let cache_version = 0
        
            // other routes that are not in Storyblok with their slug.
            let routes = ['/'] // adds home directly but with / instead of /home
            try {
                const result = await fetch(`https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`)
        
                if (!result.ok) {
                    throw new Error('Could not fetch Storyblok data')
                }
                // timestamp of latest publish
                const space = await result.json()
                cache_version = space.space.version
        
                // Recursively fetch all routes and set them to the routes array
                await fetchStories(routes, cache_version)
                // Adds the routes to the prerenderer
                if (nitroConfig.prerender && nitroConfig.prerender.routes) {
                    nitroConfig.prerender.routes.push(...routes)
                }
            } catch (error) {
                console.error(error)
            }
        },
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            'postcss-import': {},
            'tailwindcss/nesting': {},
            tailwindcss: {},
            autoprefixer: {},
            ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
        },
    },

    
    // Module options
    //----------------------
    modules: [
        [
            '@storyblok/nuxt', {
                accessToken: process.env.STORYBLOK_PREVIEW_TOKEN,
                cacheProvider: 'memory'
            },
        ],
        [
            '@nuxtjs/i18n', {
                locales: [
                    {
                        code: 'en',
                        name: 'English',
                        iso: 'en-US',
                        file: 'en.ts'
                    }, 
                    { 
                        code: 'de',
                        name: 'Deutsch',
                        iso: 'de-DE',
                        file: 'de.ts'
                    }
                ],
                defaultLocale: 'de',
                baseUrl: baseUrl,
                compilation: {
                    strictMessage: false,
                    // escapeHtml: true
                },
                lazy: true,
                langDir: 'locales',
                strategy: 'prefix_except_default',
            }
        ],
        '@nuxt/image',
        '@vueuse/nuxt',
    ],
    
    image: {
        storyblok: {
            baseURL: 'https://a2.storyblok.com'
        },
        screens: {
            'xs': 320,
            'sm': 576,
            'md': 768,
            'lg': 1024,
            'xl': 1280,
            'xxl': 1536,
            '2xl': 1536
        },
        presets: {
            logowall: {
                modifiers: {
                    format: 'webp',
                    width: 300,
                    height: 300,
                    fit: 'in'
                },
            },
            icon: {
                modifiers: {
                    format: 'webp',
                    width: 64,
                    height: 64,
                    fit: 'in'
                },
            }
        },
    },
})
