/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        "./storyblok/**/*.{vue,js,ts}",
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
        // Default theme - @https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
        screens: {
            'sm': '576px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem'
            }
        },
        aspectRatio: {
            'auto': 'auto',
            '1x1': '1 / 1',
            '4x3': '4 / 3',
            '3x4': '3 / 4',
            '16x9': '16 / 9',
            '9x16': '9 / 16',
            '16x10': '16 / 10',
            '10x16': '10 / 16',
        },
        fontFamily: {
            'mono': ['Fira Code', ...defaultTheme.fontFamily.mono],
            'body': ['Fira Code', ...defaultTheme.fontFamily.mono],
        },
        fontSize: {
            'xs': '.75rem',
            'sm': '.875rem',
            'base': '1rem',
            'md': '1.125rem',
            'lg': '1.25rem',
            'xl': '1.5rem',

            'h6': '1.25rem',
            'h5': '1.5rem',
            'h4': '1.75rem',
            'h3': '2rem',
            'h2': '2.625rem',
            'h1': '3rem',
        },
        ringColor: '#34d399',
        extend: {
            animation: {
                zoomIn: 'zoomIn .25s ease-in-out forwards',
                zoomOut: 'zoomOut .25s ease-in-out forwards',
            },
            boxShadow: {
                'teaser': '0 10px 30px -15px ' + colors.gray[950],
            },
            colors: {
                // #5DFFD2
                'transparent': 'transparent',
                'white': colors.white,
                'black': colors.black,

                // Alias
                'bodyBgColor': colors.gray[900],
                'bodyTextColor': colors.gray[300],
                'primary': colors.teal[400]
            },
            keyframes: {
                zoomIn: {
                    'from': { opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)' },
                    '50%': { opacity: 1 }
                },
                zoomOut: {
                    'from': { opacity: 1 },
                    '50%': { opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)' },
                    'to': { opacity: 0 },
                },
            },
            spacing: {
                'xxs': '.125rem',
                'xs': '.25rem',
                'sm': '.5rem',
                'mdsm': '.75rem',
                'base': '1rem',
                'mdlg': '1.25rem',
                'lg': '1.5rem',
                'xl': '2.5rem',
                '2xl': '5rem',
                '3xl': '7.5rem',
                '4xl': '10rem',
                '5xl': '15rem',
            },
            transitionDuration: {
                DEFAULT: '200ms',
            },
            transitionProperty: {
                'glowpointer': 'width, height',
            },
            transitionTimingFunction: {
                'stamp': 'cubic-bezier(0.645,0.045,0.355,1)'
            },
        },
    },
    safelist: [
        {
            pattern: /py-(0|xs|sm|base|lg|xl|2xl)/, // Needed for the custom grid spacing
            variants: ['sm', 'md', 'lg', 'xl', '2xl'],
        },
        {
            pattern: /gap-(0|xs|sm|base|lg|xl|2xl)/, // Needed for the custom grid gaps
            variants: ['sm', 'md', 'lg', 'xl', '2xl'],
        },
        {
            pattern: /grid-cols-(1|2|3|4|5|6)/, // Needed for the custom grid col sizes
            variants: ['sm', 'md', 'lg', 'xl', '2xl'],
        },
        {
            pattern: /place-items-(start|center|end)/, // Needed for the custom grid alignment
        },
    ],
    plugins: [
        require('@tailwindcss/typography'),
        require("@tailwindcss/forms")({
            strategy: 'class',
        }),
        require('@headlessui/tailwindcss')
    ],
}
