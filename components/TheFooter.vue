<script setup lang="ts">
const props = defineProps<{
    currentLocale: string
}>()

interface footerLogo {
    filename: string;
    title: string;
    alt: string;
}
interface footerProjectLinkObject {
    url: string;
    target: string;
}

const storyblokApi = useStoryblokApi()
const lang = computed(() => {
    return props.currentLocale
})

const footerProjectLogo = ref<footerLogo>()
const footerProjectLink = ref<string>()
const footerProjectContent = ref<string>()
const footerMetaContent = ref<string>()

const fetchData = async (lang: string) => {
    const { data } = await storyblokApi.get('cdn/stories/config', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        resolve_links: 'url',
        language: lang
    })
    footerProjectLogo.value = data.story.content.footer_project_logo as footerLogo
    footerProjectLink.value = data.story.content.footer_project_link as footerProjectLinkObject
    footerProjectContent.value = data.story.content.footer_project_content[0]
    footerMetaContent.value = data.story.content.footer_meta_content[0]
}

onMounted(() => {
    fetchData(lang.value)
})

watch(lang, async(newLang, oldLang) => {
    await fetchData(newLang)
})

</script>

<template>
    <footer class="relative">
        <div class="container flex flex-col items-center justify-between py-lg lg:flex-row lg:h-20 lg:py-0">
            <NuxtLink :to="footerProjectLink?.url" :target="footerProjectLink?.target" class="flex items-center transition-opacity opacity-80 hover:opacity-100">
                <NuxtImg 
                    v-if="footerProjectLogo?.filename"
                    :src="footerProjectLogo.filename" 
                    provider="storyblok" 
                    preset="icon"
                    format="webp" 
                    loading="lazy" 
                    :title="footerProjectLogo.title" 
                    :alt="footerProjectLogo.alt" 
                    class="my-auto mr-mdsm max-w-[theme(spacing.lg)] max-h-[theme(spacing.lg)] !object-contain" 
                />
                <StoryblokComponent v-if="footerProjectContent" :key="footerProjectContent" :blok="footerProjectContent" class="text-xs xl:text-sm" />
            </NuxtLink>
            <div class="flex mt-lg lg:mt-0">
                <StoryblokComponent v-if="footerMetaContent" :key="footerMetaContent" :blok="footerMetaContent" class="text-xs xl:text-sm" />
                <span class="text-xs text-red-500 inline-block ml-sm xl:text-sm">&#10084;</span>
            </div>
        </div>
    </footer>
</template>