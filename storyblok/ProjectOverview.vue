<script setup lang="ts">
const props = defineProps<{
    blok: {
        heading: null | Heading[]
    }
}>()

interface Project {
    uuid: string,
    content: ProjectContent,
    full_slug: string
}
interface ProjectContent {
    main_image: {
        filename: string, 
        title: string, 
        alt: string 
    },
    title: string,
    lead: string,
    year: number,
    categories: [],
    tech_stack: [],
    blocks: object
}
interface Heading {
    size: string,
    title: string,
    subtitle?: string,
    semantic?: boolean,
    align?: 'left' | 'center' | 'right',
    color_variant?: 'teal' | 'white',
    show_subtitle_above?: boolean
}

const isPreview = useRuntimeConfig().public.NODE_ENV !== 'production'
const { locale } = useI18n()
const storyblokApi = useStoryblokApi()

const story = await useAsyncStoryblok(
    `projects`, {
        version: isPreview ? 'draft' : 'published',
        language: locale.value,
    }
)

const projects = ref<Project[] | null>(null)
const { data } = await storyblokApi.get('cdn/stories', {
    version: isPreview ? 'draft' : 'published',
    starts_with: 'projects',
    is_startpage: false,
    language: locale.value,
})
projects.value = data.stories

if (!isPreview) {
    if (!story.value) {
        showError({ statusCode: 404, statusMessage: "Page Not Found" })
    }
}

const projectsSortedAfterDate = computed(() => {
    let allProjects = projects.value 
    if (allProjects) {
        return allProjects.sort((a: { content: { year: number }}, b: { content: { year: number }}) => b.content.year - a.content.year)
    }
    return null
})
</script>

<template>
    <div class="py-xl md:py-2xl">
        <Heading v-if="props.blok.heading" :blok="props.blok.heading[0]" />
        <div class="grid grid-cols-1 gap-lg place-items-start w-full mt-lg md:grid-cols-2 lg:gap-xl lg:mt-xl xl:grid-cols-3">
            <ProjectCard
                v-for="project in projectsSortedAfterDate"
                :key="project.uuid"
                :project="project.content"
                :slug="project.full_slug"
            />
        </div>
    </div>
</template>