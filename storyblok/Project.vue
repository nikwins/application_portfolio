<script setup lang="ts">
const props = defineProps<{
    blok: Project
}>()

interface Project {
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
    link: {
        url: string,
    }
    blocks: object
}
onMounted(() => {
})
</script>
<template>
    <div v-editable="props.blok" class="pb-2xl">
        <div class="relative mt-sm mb-lg lg:mt-base lg:mb-xl">
            <NuxtImg 
                v-if="props.blok.main_image.filename"
                :src="props.blok.main_image.filename" 
                provider="storyblok" 
                format="webp" 
                sizes="320px sm:576px md:786px lg:1024px xl:1280px 2xl:1536px" 
                loading="lazy" 
                :title="props.blok.main_image.title" 
                :alt="props.blok.main_image.alt" 
                class="w-full h-full object-cover rounded-xl" 
            />
        </div>
        <div class="flex items-center">
            <BasicHeading :size="1" :title="props.blok.title" color_variant="teal"></BasicHeading>
            <NuxtLink v-if="props.blok.link.url" :to="props.blok.link.url" target="_blank" :title="$t('project.toWebsite')" class="block mb-sm transition-colors fill-bodyTextColor hover:fill-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-lg h-lg md:w-8 md:h-8 lg:w-xl lg:h-xl lg:mb-mdsm">
                    <path d="M440 256H424a8 8 0 0 0 -8 8V464a16 16 0 0 1 -16 16H48a16 16 0 0 1 -16-16V112A16 16 0 0 1 48 96H248a8 8 0 0 0 8-8V72a8 8 0 0 0 -8-8H48A48 48 0 0 0 0 112V464a48 48 0 0 0 48 48H400a48 48 0 0 0 48-48V264A8 8 0 0 0 440 256zM500 0 364 .3a12 12 0 0 0 -12 12v10a12 12 0 0 0 12 12L454 34l.7 .7L131.5 357.9a12 12 0 0 0 0 17l5.7 5.7a12 12 0 0 0 17 0L477.3 57.3l.7 .7-.3 90a12 12 0 0 0 12 12h10a12 12 0 0 0 12-12L512 12A12 12 0 0 0 500 0z"/>
                </svg>
            </NuxtLink>
        </div>
        <hr class="block mb-lg lg:mb-xl opacity-80">
        <div class="flex flex-col w-full lg:flex-row">
            <div class="lg:text-md lg:w-1/2">
                <div class="flex mb-lg">
                    <div class="w-40 text-primary">{{ $t('project.year') }}</div>
                    <div>
                        {{ props.blok.year }}
                    </div>
                </div>
                <div class="flex mb-lg">
                    <div class="w-40 text-primary">{{ $t('project.categories') }}</div>
                    <ul>
                        <li v-for="category in props.blok.categories">
                            {{ category }}
                        </li>
                    </ul>
                </div>
                <div class="flex">
                    <div class="w-40 text-primary">{{ $t('project.techstack') }}</div>
                    <div class="w-[calc(100%_-_10rem)]">
                        <ul class="flex flex-wrap">
                            <li v-for="tech in props.blok.tech_stack">
                                <BasicBadge :name="tech"></BasicBadge>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-xl lg:mt-0 lg:w-1/2">
                <p class="lead">{{ props.blok.lead }}</p>
            </div>
        </div>
        <div v-editable="blok" class="relative alignfull bg-gray-800/50 p-lg mt-xl md:rounded-xl md:mx-0 md:w-full md:p-xl lg:mt-2xl">
            <StoryblokComponent v-for="blok in props.blok.blocks" :key="blok" :blok="blok" />
        </div>
        <BasicButton to="/projects/" :text="$t('general.backToOverview')" class="mt-base lg:mt-lg xl:mt-xl"></BasicButton>
    </div>
</template>