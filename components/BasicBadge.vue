<script setup lang="ts">
const props = defineProps<{
    name: string,
}>()
</script>
<template>
    <div class="inline-block rounded-full bg-gray-800 text-primary py-sm px-mdsm text-xs mr-sm mb-sm">{{ props.name }}</div>
</template>