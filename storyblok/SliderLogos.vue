<script setup lang="ts">
const props = defineProps<{
    blok: SliderLogos
}>()

interface SliderLogos {
    logos: { 
        filename: string, 
        title: string, 
        alt: string 
    }[],
    first_row: { 
        filename: string, 
        title: string, 
        alt: string 
    }[]
    second_row: { 
        filename: string, 
        title: string, 
        alt: string 
    }[]
}

const minNumberOfLogos = 20

const repetitions = computed(() => {
    let numberOfLogos: number
    let numberOfFirstRow: number = props.blok.first_row.length
    let numberOfSecondRow: number = props.blok.second_row.length

    numberOfLogos = numberOfFirstRow + numberOfSecondRow

    return Math.ceil(minNumberOfLogos / numberOfLogos)
})

</script>
<style>
@keyframes runningLogoX {
    0% {
        transform: translateX(0px);
    }
    100% {
        transform: translateX(-100%);
    }
}
@keyframes runningLogoY {
    0% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(-100%);
    }
}
.running-logos {
    animation: 20s linear 0s infinite normal none running runningLogoX;

    @media (min-width: 1024px) {
        animation-name: runningLogoY;
    }
}
</style>
<template>
    <div v-editable="blok" class="alignfull overflow-x-hidden h-[300px] my-xl lg:w-full lg:mx-0 lg:flex lg:overflow-y-hidden lg:h-[1090px] lg:-mt-36 xl:h-[990px] 2xl:h-[920px] 2xl:-mt-4xl">
        <div class="flex mb-14 lg:mb-0 lg:basis-1/2 lg:flex-col">
            <div
                v-for="i in repetitions"
                :key="i"
                class="running-logos flex items-center gap-xl px-xl lg:gap-2xl lg:flex-col lg:py-xl"
            >
                <NuxtImg 
                    v-for="logo in props.blok?.first_row" 
                    :key="logo.filename"
                    :src="logo.filename" 
                    provider="storyblok" 
                    preset="logowall"
                    format="webp" 
                    :title="logo.title" 
                    :alt="logo.alt" 
                    class="my-auto min-w-[50px] max-w-[150px] max-h-[50px] !object-contain" 
                />
            </div>
        </div>
        <div class="flex flex-row lg:basis-1/2 lg:flex-col">
            <div
                v-for="i in repetitions"
                :key="i"
                class="running-logos flex items-center gap-xl px-lg lg:gap-2xl lg:flex-col lg:py-xl"
                style="animation-direction: reverse;"
            >
                <NuxtImg 
                    v-for="logo in props.blok?.second_row" 
                    :key="logo.filename"
                    :src="logo.filename" 
                    provider="storyblok" 
                    preset="logowall"
                    format="webp" 
                    :title="logo.title" 
                    :alt="logo.alt" 
                    class="my-auto min-w-[50px] max-w-[150px] max-h-[50px] !object-contain" 
                />
            </div>
        </div>
    </div>
</template>