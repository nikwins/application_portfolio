<script setup lang="ts">
const props = defineProps<{
    blok: {
        skills: {},
        delay_in_ms: number
    }
}>()
</script>

<template>
    <section 
        v-editable="blok"
        class="grid gap-lg w-full md:grid-cols-2 xl:grid-cols-3 xl:gap-xl"
    >
        <SkillMeter
            v-for="(skill, index) in props.blok.skills"
            :key="skill"
            :blok="skill"
            :delay="index * props.blok.delay_in_ms"
        />
    </section>
</template>