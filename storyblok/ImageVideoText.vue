<script setup lang="ts">
import { getFileExtension, isImage, isVideo } from '~/composables/storyblokHelpers'

const props = defineProps<{
    blok: ImageVideoText
}>()

interface ImageVideoText {
    image_or_video: {
        filename: string, 
        title: string, 
        alt: string 
    },
    size_variant: string,
    image_or_video_position: string,
    vertical_align: string,
    image_dimensions: string,
    show_image_or_video_first_on_mobile: boolean,
    blocks: object
}

const hasImage = computed(() => {
    return isImage(props.blok.image_or_video.filename)
})
const hasVideo = computed(() => {
    return isVideo(props.blok.image_or_video.filename)
})
const imageSize = computed(() => {
    switch(props.blok.image_dimensions) {
        case 'original':
            return '1280x0'
            break;
        case '1x1':
            return '1024x1024'
            break;
        case '16x9':
            return '1280x720'
            break;
        case '16x10':
            return '1280x800'
            break;
        case '4x3':
            return '1280x960'
            break;
        case '3x4':
            return '960x1280'
            break;
        case '10x16':
            return '800x1280'
            break;
        case '9x16':
            return '720x1280'
            break;
        default:
            return '1280x0'
    }
})

</script>
<template>
    <div 
    v-editable="props.blok"
    :class="[
        'relative flex w-full',
        props.blok.vertical_align ? 'lg:items-' + props.blok.vertical_align : '',
        props.blok.show_image_or_video_first_on_mobile ? 'flex-col' : 'flex-col-reverse',
        props.blok.image_or_video_position == 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'
    ]">
        <div :class="[
            'basis-full',
            props.blok.size_variant == 'lg-text' ? 'lg:basis-5/12' : 'lg:basis-7/12',
            props.blok.image_or_video_position == 'left' ? 'lg:mr-xl xl:mr-2xl' : 'lg:ml-xl xl:ml-2xl'
        ]">
            <picture 
            v-if="hasImage" 
            :class="[
                'block w-9/12 relative mb-[calc(theme(spacing.lg)_*_2)] lg:w-full',
                'before:block before:absolute before:w-full before:h-full before:border-2 before:border-teal-400 before:z-[-1] before:rounded before:top-lg before:left-lg',
                props.blok.image_dimensions == 'original' ? '' : 'aspect-' + props.blok.image_dimensions,
                props.blok.show_image_or_video_first_on_mobile ? '' : 'mt-lg lg:mt-0'
            ]"
            :style="props.blok.image_dimensions != 'original' ? 'aspect-ratio: ' + imageSize : ''"
            >            
                <NuxtImg 
                    :src="props.blok.image_or_video.filename" 
                    provider="storyblok" 
                    format="webp" 
                    sizes="320px sm:576px md:786px lg:768px xl:768px 2xl:1024px" 
                    loading="lazy" 
                    :title="props.blok.image_or_video.title" 
                    :alt="props.blok.image_or_video.alt" 
                    class="!h-full w-full object-cover rounded" 
                />
            </picture>
            <video v-if="hasVideo" autoplay playsinline muted loop class="aspect-16x10"> 
                <source :src="props.blok.image_or_video.filename" :type="'video/' + getFileExtension(props.blok.image_or_video.filename)">
            </video>
        </div>
        <div :class="[
            'basis-full',
            props.blok.size_variant == 'lg-text' ? 'lg:basis-7/12' : 'lg:basis-5/12',
        ]">
            <StoryblokComponent v-for="blok in props.blok.blocks" :key="blok._uid" :blok="blok" />
        </div>
    </div>
</template>