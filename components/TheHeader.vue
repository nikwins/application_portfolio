<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
const windowScroll = useWindowScroll()

const props = defineProps<{
    currentLocale: string
}>()

interface HeaderMenuItem {
    _uid: string;
    link: {
        cached_url: string;
        story: {
            name: string;
        }
    };
}
interface HeaderButtonLink {
    cached_url: string;
    story: {
        name: string;
    }
}

const storyblokApi = useStoryblokApi()
const lang = computed(() => {
    return props.currentLocale
})

const headerMenu = ref<HeaderMenuItem[]>([])
const headerButtonLink = ref<HeaderButtonLink>()

const fetchData = async (lang: string) => {
    const { data } = await storyblokApi.get('cdn/stories/config', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        resolve_links: 'url',
        language: lang
    })
    headerMenu.value = data.story.content.header_menu as HeaderMenuItem[]
    headerButtonLink.value = data.story.content.header_button_link as HeaderButtonLink
}
fetchData(lang.value)

watch(lang, async(newLang, oldLang) => {
    await fetchData(newLang)
})

const scrollY = computed(() => {
    return windowScroll.y.value
})
const scrollingDown = ref<boolean>(false)

watch(scrollY, async(newPos, oldPos) => {
    if ( (newPos > oldPos) && newPos > 100 ) {
        scrollingDown.value = true
    }  else {
        scrollingDown.value = false
    }
})

</script>

<template>
    <header 
    :class="[
        'fixed top-0 z-50 w-full h-20 bg-bodyBgColor shadow-teaser transition-all duration-500',
        scrollingDown ? '-top-20' : 'top-0'
    ]">
        <div class="container h-full flex items-center justify-between">
            <NuxtLink to="/">
                <div class="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-gray-900 text-lg font-bold">
                    NW
                </div>
            </NuxtLink>
            <nav v-if="headerMenu || headerButtonLink" class="flex items-center">
                <ul v-if="headerMenu" class="flex space-x-8 text-lg">
                    <li v-for="blok in headerMenu" :key="blok._uid">
                        <NuxtLink :to="'/' + blok.link.cached_url" class="transition-colors hover:text-primary">
                            {{ blok.link.story.name }}
                        </NuxtLink>
                    </li>
                </ul>
                <BasicButton v-if="headerButtonLink" :to="'/' + headerButtonLink.cached_url" :text="headerButtonLink.story.name" size="small" class="ml-base" />
            </nav>
        </div>
    </header>
</template>