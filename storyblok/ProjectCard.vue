
<script setup lang="ts">
const props = defineProps<{
    project: {
        main_image: {
            filename: string, 
            title: string, 
            alt: string 
        },
        title: string,
        year: number,
        categories: [],
        tech_stack: [],
    },
    slug: string,
}>()
</script>
<template>
    <NuxtLink
        v-editable="props.project"
        :to="'/' + props.slug"
        :class="[
            'group relative block w-full h-full rounded shadow-teaser transition-all z-10 border border-white',
            'before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-primary before:rounded-lg before:z-20 lg:hover:before:bg-white',
            'lg:after:absolute lg:after:w-full lg:after:top-0 lg:after:left-0 lg:after:opacity-0 lg:after:h-full lg:after:border-2 lg:after:border-primary lg:after:rounded-lg lg:after:z-[1] lg:after:transition-all',
            'lg:hover:after:opacity-100 lg:hover:after:right-sm lg:hover:after:top-sm lg:hover:translate-x-xs lg:hover:-translate-y-xs lg:hover:after:-translate-x-base lg:hover:after:translate-y-sm'
        ]">
        
        <picture class="relative block w-full h-full z-30 rounded transition-all aspect-16x10 mix-blend-multiply grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 lg:group-hover:mix-blend-normal">
            <NuxtImg 
                :src="props.project.main_image.filename"
                format="webp" 
                provider="storyblok" 
                sizes="320px sm:576px md:786px lg:786px xl:786px 2xl:786px" 
                :title="props.project.main_image.title" 
                :alt="props.project.main_image.alt" 
                class="!h-full w-full object-cover rounded" />
        </picture>

        <div class="absolute right-base top-base z-30 drop-shadow">
            {{ props.project.year }}
        </div>

        <div class="absolute z-30 left-0 right-0 bottom-0 p-base lg:p-lg">
            <BasicHeading :title="props.project.title" :size="5" :semantic="false" class="!mb-xs drop-shadow" />
            <BasicBadge v-for="category in props.project.categories" :key="category" :name="category" />
        </div>
    </NuxtLink>
</template>