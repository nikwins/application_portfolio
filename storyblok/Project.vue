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
        <BasicHeading :size="1" :title="props.blok.title" color_variant="teal"></BasicHeading>
        <hr class="block mb-lg lg:mb-xl opacity-80">
        <div class="flex flex-col w-full lg:flex-row">
            <div class="lg:text-md lg:w-1/2">
                <div class="flex mb-lg">
                    <div class="w-40 text-primary">Jahr</div>
                    <div>
                        {{ props.blok.year }}
                    </div>
                </div>
                <div class="flex mb-lg">
                    <div class="w-40 text-primary">Kategorien</div>
                    <ul>
                        <li v-for="category in props.blok.categories">
                            {{ category }}
                        </li>
                    </ul>
                </div>
                <div class="flex">
                    <div class="w-40 text-primary">Tech-Stack</div>
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