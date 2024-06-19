<script setup lang="ts">
const props = defineProps<{
    blok: {
        spacing: string,
        custom_spacing_xs: string,
        custom_spacing_sm: string,
        custom_spacing_md: string,
        custom_spacing_lg: string,
        custom_spacing_xl: string,
        custom_spacing_2xl: string,
    }
}>()
</script>
<template>
    <div 
        v-editable="blok" 
        :class="[
            'w-full',
            props.blok?.spacing == 'custom' ? 
            'py-' + props.blok?.custom_spacing_xs + 
            ' sm:py-' + props.blok?.custom_spacing_sm + 
            ' md:py-' + props.blok?.custom_spacing_md + 
            ' lg:py-' + props.blok?.custom_spacing_lg + 
            ' xl:py-' + props.blok?.custom_spacing_xl + 
            ' 2xl:py-' + props.blok?.custom_spacing_2xl : 
            'py-' + props.blok?.spacing
        ]"
    ></div>
</template>