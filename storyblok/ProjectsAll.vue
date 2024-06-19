<script setup lang="ts">
defineProps({ blok: Object })

const isPreview = useRuntimeConfig().public.NODE_ENV !== 'production'
const projects = ref(null)
const storyblokApi = useStoryblokApi()
const { data } = await storyblokApi.get('cdn/stories', {
    version: isPreview ? 'draft' : 'published',
    starts_with: 'projects',
    is_startpage: false,
})
projects.value = data.stories
</script>
<template>
    <div class="grid grid-cols-1 gap-lg place-items-start w-full md:grid-cols-2 lg:gap-xl xl:grid-cols-3">
        <ProjectCard
            v-for="project in projects"
            :key="project.uuid"
            :project="project.content"
            :slug="project.full_slug"
        />
    </div>
</template>