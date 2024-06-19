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

const { data: story } = await useAsyncData(
    `${locale.value}-${url}`,
    async () => {
        const { data } = await useStoryblokApi().get(`cdn/stories/${url.replace(/\/$/, '')}`, {
            version: isPreview ? 'draft' : 'published',
            language: locale.value,
            resolve_relations: resolveRelations
        })
        return data?.story
    }
)

if (!isPreview) {
    if (!story.value) {
        showError({ statusCode: 404, statusMessage: "Page Not Found" })
    }
}

onMounted(() => {
    if (isPreview && story.value && story.value.id) {
        useStoryblokBridge(
            story.value.id,
            (evStory) => story.value = evStory,
            {
                resolveRelations,
            }
        )
    }
    const body = document.body
    runLoaderAnimation(body)
})
</script>
<template>
    <PageWrapper>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </PageWrapper>
</template>