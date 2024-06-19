<script setup lang="ts">
const props = defineProps<{
    blok: {
        words: {
            word: string
        }[],
        text_before?: string,
        size: string,
        highlight: boolean,
        delay?: string
    }
}>()

const words = computed(() => {
    let arrayOfWordObjects = props.blok.words 
    return arrayOfWordObjects.map(obj => obj.word)
})
const delay = computed(() => {
    if (props.blok.delay) return parseInt(props.blok.delay)
    return 2000
})
</script>
<template>
    <SwitchText :words="words" :text_before="props.blok.text_before" :size="props.blok.size" :highlight="props.blok.highlight" :delay="delay" />
</template>