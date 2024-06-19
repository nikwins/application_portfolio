<script setup lang="ts">
import { usePointer, useWindowScroll } from '@vueuse/core'
const { x, y, pressure, pointerType } = usePointer()
const windowScroll = useWindowScroll()

const pointerX = computed(() => {
    return x.value + windowScroll.x.value
})
const pointerY = computed(() => {
    return y.value + windowScroll.y.value
})
</script>
<template>
    <div 
        :class="['hidden pointer-events-none fixed inset-0 z-[100] lg:absolute lg:block', pressure > 0 ? 'transition-glowpointer--pressed' : 'transition-glowpointer']" 
        :style="'background: radial-gradient(500px at ' + pointerX + 'px ' + pointerY + 'px, rgba(110, 231, 183, 0.15), transparent var(--pointer-glow))'"
    >
    </div>
</template>