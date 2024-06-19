<script setup lang="ts">
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
</script>

<template>
    <StoryblokComponent v-if="story" :blok="story.content" />
</template>