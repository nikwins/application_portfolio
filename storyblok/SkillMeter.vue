<script setup lang="ts">
import { vIntersectionObserver } from '@vueuse/components'

const props = defineProps<{
    blok: SkillMeter,
    delay: number
}>()

interface SkillMeter {
    skill: string,
    experience: number,
    logo: {
        filename: string,
        title: string,
        alt: string,
    }
}

const isInViewport = ref(false)
const wasInViewport = ref(false)
const isScrollingUp = ref(false)
const lastScrollTop = ref(0)

const onIntersectionObserver = ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
    if (isIntersecting) {
        isInViewport.value = true
        if (!wasInViewport.value) {
            wasInViewport.value = true
        }
    } else {
        isInViewport.value = false
    }
}

const skillLevel = computed(() => {
    if ( (isInViewport.value) || (wasInViewport.value && isScrollingUp.value) ) {
        return props.blok.experience
    }
    return 0
});

const animationClasses = computed(() => {
    if (isInViewport.value) {
        return 'opacity-100 transition-all duration-1000'
    }
    if (wasInViewport.value && isScrollingUp.value) {
        return 'opacity-100'
    }
    return 'opacity-0'
});

const transitionDelay = computed(() => {
    if (props.delay && isInViewport.value) {
        return `transition-delay: ${props.delay}ms`
    }
    return ''
})

onMounted(() => {
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.scrollY || document.documentElement.scrollTop
        isScrollingUp.value = currentScrollTop < lastScrollTop.value
        lastScrollTop.value = currentScrollTop
    })
})
</script>
<template>
    <div 
        v-intersection-observer="onIntersectionObserver" 
        v-editable="blok" 
        :class="['w-full', animationClasses]" 
        :style="transitionDelay"
    >
        <div class="flex mb-sm">
            <NuxtImg 
                v-if="props.blok.logo.filename"
                :src="props.blok.logo.filename" 
                provider="storyblok" 
                preset="icon"
                format="webp" 
                loading="lazy" 
                :title="props.blok.logo.title" 
                :alt="props.blok.logo.alt" 
                class="my-auto mr-mdsm max-w-[theme(spacing.lg)] max-h-[theme(spacing.lg)] !object-contain" 
            />
            {{ props.blok.skill }}
        </div>
        <div            
            class="w-full bg-gray-700 rounded-full h-sm"
        >
            <span 
                :class="['block bg-primary h-full rounded-full', isInViewport ? 'transition-all duration-1000' : '']"
                :style="[
                    'width: ' + skillLevel + '%',
                    transitionDelay
                ]"
            ></span>
        </div>       
    </div>
</template>