<script lang="ts" setup>
interface Project {
    uuid: string,
    full_slug: string,
    content: {
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
    }
}
const props = defineProps<{
    blok: {
        projects: Project[]
    }
}>()
</script>
<template>
    <ul>
        <li 
            v-for="(project, index) in props.blok.projects"
            :key="project.uuid"
            class="relative grid grid-cols-12 items-center shadow-teaser [&:not(:last-of-type)]:mb-xl lg:shadow-none lg:[&:not(:last-of-type)]:mb-3xl"
        >
            <div 
            :class="[
                'relative col-span-full p-xl pb-base z-20 lg:col-span-4 lg:flex lg:flex-col', 
                index % 2 ? 'lg:pl-0' : 'lg:pr-0 lg:order-1 lg:text-right lg:items-end'
            ]">
                <NuxtLink :to="'/' + project.full_slug" class="block [&:hover>div>*]:text-primary">
                    <BasicHeading :size="3" :title="project.content.title" :subtitle="project.content.year + ''" :semantic="false" color_variant="teal" :class="index % 2 ? '' : 'lg:text-right'" />
                </NuxtLink>
                <div class="mb-sm sm:mt-sm lg:w-[150%] lg:bg-gray-800 lg:p-lg lg:rounded">
                    <p class="line-clamp-6 text-left" v-html="project.content.lead"></p>
                </div>
                <ul 
                    :class="[
                        'flex flex-wrap', 
                        index % 2 ? '' : 'lg:justify-end lg:[&>li>div]:mr-0 lg:[&>li:not(:first-child)>div]:ml-sm'
                    ]">
                    <li v-for="category in project.content.categories" :key="category" class="block mt-sm">
                        <BasicBadge :name="category" />
                    </li>
                </ul>
                <ul 
                    :class="[
                        'flex flex-wrap mt-sm text-xs', 
                        index % 2 ? '' : 'lg:justify-end', project.content.link.url ? '' : 'mb-lg'
                    ]">
                    <li 
                    v-for="tech in project.content.tech_stack" 
                    :key="tech" 
                    :class="[
                        'mb-xs [&:not(:last-of-type)]:mr-sm', 
                        index % 2 ? '' : 'lg:[&:not(:last-of-type)]:mr-0 lg:[&:not(:first-of-type)]:ml-sm'
                    ]">
                        {{ tech }}
                    </li>
                </ul>
                <NuxtLink v-if="project.content.link.url" :to="project.content.link.url" target="_blank" class="block py-lg transition-colors fill-bodyTextColor hover:fill-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-lg h-lg">
                        <path d="M440 256H424a8 8 0 0 0 -8 8V464a16 16 0 0 1 -16 16H48a16 16 0 0 1 -16-16V112A16 16 0 0 1 48 96H248a8 8 0 0 0 8-8V72a8 8 0 0 0 -8-8H48A48 48 0 0 0 0 112V464a48 48 0 0 0 48 48H400a48 48 0 0 0 48-48V264A8 8 0 0 0 440 256zM500 0 364 .3a12 12 0 0 0 -12 12v10a12 12 0 0 0 12 12L454 34l.7 .7L131.5 357.9a12 12 0 0 0 0 17l5.7 5.7a12 12 0 0 0 17 0L477.3 57.3l.7 .7-.3 90a12 12 0 0 0 12 12h10a12 12 0 0 0 12-12L512 12A12 12 0 0 0 500 0z"/>
                    </svg>
                </NuxtLink>
            </div>
            <NuxtLink 
                :to="'/' + project.full_slug" 
                :class="[
                    'group absolute block col-span-full w-full h-full rounded-lg z-10',
                    'before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-primary before:rounded-lg before:z-20',
                    'lg:relative lg:col-span-8 lg:transition-all lg:shadow-teaser lg:border lg:border-white',
                    'lg:after:absolute lg:after:w-full lg:after:h-full lg:after:top-base lg:after:border-2 lg:after:border-primary lg:after:rounded-lg lg:after:z-[1] lg:after:transition-all',
                    index % 2 ? 'lg:after:left-base lg:hover:-translate-x-sm lg:hover:-translate-y-sm lg:hover:after:translate-x-base lg:hover:after:translate-y-base' : 'lg:after:right-base lg:hover:translate-x-sm lg:hover:-translate-y-sm lg:hover:after:-translate-x-base lg:hover:after:translate-y-base'
                ]">
                <picture class="relative block w-full h-full z-30 mix-blend-multiply grayscale brightness-50 lg:transition-all lg:group-hover:grayscale-0 lg:group-hover:brightness-100 lg:group-hover:mix-blend-normal">
                    <NuxtImg 
                        :src="project.content.main_image.filename"
                        format="webp" 
                        provider="storyblok" 
                        sizes="576px sm:786px md:1024px lg:1024px xl:1024px 2xl:1024px" 
                        loading="lazy" 
                        :title="project.content.main_image.title" 
                        :alt="project.content.main_image.alt" 
                        class="h-full w-full object-cover rounded-lg" />
                </picture>
            </NuxtLink>
        </li>
    </ul>
</template>