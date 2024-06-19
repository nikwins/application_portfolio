
<script setup lang="ts">
const props = defineProps<{
    blok: {
        autoplay: boolean,
        video: {
            filename: string,
            title: string,
            alt: string,
        },
    }
}>()
</script>
<template>
    <video 
        v-editable="props.blok" 
        :autoplay="props.blok.autoplay" :playsinline="props.blok.autoplay" :muted="props.blok.autoplay" :loop="props.blok.autoplay" 
        class="w-full"
    > 
        <source :src="props.blok?.video.filename" :type="'video/' + getFileExtension(props.blok?.video.filename)">
    </video>
</template>