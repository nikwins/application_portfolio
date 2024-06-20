<script setup lang="ts">
import { useLoaderAnimation } from '~/composables/useLoaderAnimation'

definePageMeta({
    pageTransition: {
        name: 'ink-drops',
        mode: 'out-in',
        onEnter: (el: HTMLElement, done: () => void) => {
            const { runLoaderAnimation } = useLoaderAnimation()
            runLoaderAnimation(el)
        },
    }
})

const { runLoaderAnimation } = useLoaderAnimation()
const { slug } = useRoute().params
const url = slug && slug.length > 0 ? slug.join('/') : 'home'
const isPreview = useRuntimeConfig().public.NODE_ENV !== 'production'
const { locale } = useI18n()
const resolveRelations = ['projects-favorites.projects']

const story = await useAsyncStoryblok(
    url, {
        version: isPreview ? 'draft' : 'published',
        language: locale.value,
        resolve_relations: resolveRelations
    }
)

if (!isPreview) {
    if (!story.value) {
        showError({ statusCode: 404, statusMessage: "Page Not Found" })
    }
}

onMounted(() => {
    const body = document.body
    runLoaderAnimation(body)
})
</script>
<template>
    <section>
        <PageLoader></PageLoader>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </section>
</template>