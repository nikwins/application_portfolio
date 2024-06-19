
<script setup lang="ts">
import { getFileExtension } from '~/composables/storyblokHelpers'

const props = defineProps<{
    blok: {
        image_dimensions: string,
        image: {
            filename: string,
            title: string,
            alt: string,
        },
    }
}>()

const fileExtension = computed(() => {
    return getFileExtension(props.blok.image.filename)
})
</script>
<template>
    <picture
        v-editable="props.blok"
        :class="[
            'block',
            props.blok.image_dimensions == 'original' ? 'w-full' : '',
        ]"
        :style="props.blok.image_dimensions != 'original' ? 'aspect-ratio: ' + props.blok.image_dimensions : ''"
    >
        <NuxtImg 
            :src="props.blok.image.filename"
            :format="fileExtension != 'gif' ? 'webp' : false"
            provider="storyblok" 
            sizes="320px sm:576px md:786px lg:1024px xl:1280px 2xl:1536px" 
            loading="lazy" 
            :title="props.blok.image.title" 
            :alt="props.blok.image.alt" 
            class="!h-full w-full object-cover" />
    </picture>
</template>