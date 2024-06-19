<script setup lang="ts">
interface Props {
    primaryColor: string,
    secondaryColor?: string,
    secondary?: boolean,
    container_width?: 'default' | 'narrow' | 'full_width',
}
const props = withDefaults(defineProps<Props>(), {
    container_width: 'default'
})
</script>
<template>
    <svg 
        viewBox="0 0 1420 335" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" 
        :class="[
            'absolute w-screen -top-16 object-fill z-0 h-2xl md:h-3xl md:-top-28 lg:h-4xl lg:-top-36 2xl:h-48 2xl:-top-40',
            '-right-base sm:right-[calc(((100vw_-_theme(screens.sm))_/_-2)_-_(theme(spacing.base)))] md:right-[calc(((100vw_-_theme(screens.md))_/_-2)_-_(theme(spacing.base)))]',
            props.container_width == 'default' ? 'lg:right-[calc(((100vw_-_theme(screens.lg))_/_-2)_-_(theme(spacing.base)))] xl:right-[calc(((100vw_-_theme(screens.xl))_/_-2)_-_(theme(spacing.base)))] 2xl:right-[calc(((100vw_-_theme(screens.2xl))_/_-2)_-_(theme(spacing.base)))]' : '',
            props.container_width == 'narrow' ? 'lg:right-[calc(((100vw_-_1000px)_/_-2))]' : '',
        ]">
        <path :fill="props.primaryColor" fill-rule="evenodd" clip-rule="evenodd" d="M1420 156.465L1361 163.802C1302 171.14 1183 185.815 1065 148.079C947 111.39 829 22.2891 710 7.61364C592 -8.11004 474 51.64 355 66.3154C237 82.0391 119 51.64 60 36.9645L0 22.2891V334.666H60C119 334.666 237 334.666 355 334.666C474 334.666 592 334.666 710 334.666C829 334.666 947 334.666 1065 334.666C1183 334.666 1302 334.666 1361 334.666H1420V156.465Z"></path>
    </svg>
    <svg 
        v-if="secondary"
        viewBox="0 0 1420 335" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" 
        :class="[
            'absolute w-screen -top-16 object-fill z-10 h-2xl md:h-3xl md:-top-28 lg:h-4xl lg:-top-36 2xl:h-48 2xl:-top-40',
            '-right-base sm:right-[calc(((100vw_-_theme(screens.sm))_/_-2)_-_(theme(spacing.base)))] md:right-[calc(((100vw_-_theme(screens.md))_/_-2)_-_(theme(spacing.base)))]',
            props.container_width == 'default' ? 'lg:right-[calc(((100vw_-_theme(screens.lg))_/_-2)_-_(theme(spacing.base)))] xl:right-[calc(((100vw_-_theme(screens.xl))_/_-2)_-_(theme(spacing.base)))] 2xl:right-[calc(((100vw_-_theme(screens.2xl))_/_-2)_-_(theme(spacing.base)))]' : '',
            props.container_width == 'narrow' ? 'lg:right-[calc(((100vw_-_1000px)_/_-2))]' : '',
        ]"
    >
        <path :fill="props.secondaryColor" fill-rule="evenodd" clip-rule="evenodd" d="M343.11,0h1076.89v334.67-178.2l-59,7.34c-59,7.34-178,22.01-296-15.72-118-36.69-236-125.79-355-140.47-118-15.72-236,44.03-355,58.7-118,15.72-236-14.68-295-29.35L0,22.29V0" />
    </svg>
</template>