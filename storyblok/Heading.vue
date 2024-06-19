<script setup lang="ts">
const props = defineProps<{
    blok: Heading
}>()
interface Heading {
    size: string,
    title: string,
    subtitle?: string,
    semantic?: boolean,
    align?: 'left' | 'center' | 'right',
    color_variant?: 'teal' | 'white',
    show_subtitle_above?: boolean
}
</script>
<template>
    <BasicHeading 
        v-editable="props.blok"
        :size="props.blok.size" 
        :title="props.blok.title" 
        :subtitle="props.blok.subtitle" 
        :semantic="props.blok.semantic"
        :align="props.blok.align"
        :color_variant="props.blok.color_variant"
        :show_subtitle_above="props.blok.show_subtitle_above"
    />
</template>