<script setup lang="ts">
const props = defineProps<{
    blok: {
        size: 'small' | 'default' | 'large',
        text: string,
        link: {
            cached_url: string,
            target: string,
        },
        variant: 'teal',
        align?: 'left' | 'center' | 'right'
    }
}>()
</script>
<template>
    <BasicButton 
        :size="props.blok.size" 
        :text="props.blok.text" 
        :to="props.blok.link.cached_url" 
        :target="props.blok.link.target" 
        :variant="props.blok.variant" 
        :align="props.blok.align" 
    />
</template>