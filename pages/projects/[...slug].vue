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
const { locale } = useI18n()
const { slug } = useRoute().params
const isPreview = useRuntimeConfig().public.NODE_ENV !== 'production'

const story = await useAsyncStoryblok(
    `projects/${slug}`, {
        version: isPreview ? 'draft' : 'published',
        language: locale.value,
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
    <PageWrapper>
        <StoryblokComponent v-if="story" :blok="story.content" />
    </PageWrapper>
</template>