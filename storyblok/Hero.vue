<script setup lang="ts">
const props = defineProps<{
    blok: {
        blocks: object,
    }
}>()
</script>
<template>
    <HeroSquares>        
        <StoryblokComponent v-for="blok in props.blok.blocks" :key="blok" :blok="blok" />
    </HeroSquares>
</template>