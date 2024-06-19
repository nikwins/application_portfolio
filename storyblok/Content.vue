<script setup lang="ts">
const props = defineProps<{
    blok: {
        content: {
            text: string,
            type: string
        },
        highlight_bolds: boolean,
        size: string
    }
}>()

const resolvedContent = computed(() => renderRichText(props.blok.content))
</script>
<template>
    <div 
        v-editable="props.blok" 
        v-html="resolvedContent" 
        :class="[
            'styled-content',
            props.blok.highlight_bolds ? '[&>p>b]:text-primary [&>p>strong]:text-primary' : '',
            props.blok.size != 'base' && props.blok.size !== undefined ? 'text-' + props.blok.size : 'text-base'
        ]"></div>
</template>