<script setup lang="ts">
</script>
<template>
    <section id="sectionLoader" class="fixed top-0 left-0 right-0 h-[200vh] z-[1000]">
        <div class="h-screen relative text-center flex flex-col flex-wrap justify-center bg-primary">
            <BasicHeading :title="$t('general.name')" :size="1" align="center" color_variant="dark" :semantic="false" />
            <BasicHeading :title="$t('general.position')" :size="6" align="center" color_variant="dark" :semantic="false" />
        </div>
        <div id="shapeWrap" class="relative z-10 -mt-sm">
            <svg style="transform-origin: 50% 0%;" id="shape" class="h-screen w-full block overflow-hidden fill-primary origin-[50%_0%]" width="100%" height="100vh" preserveAspectRatio="none" viewBox="0 0 1440 800" xmlns:pathdata="http://www.codrops.com/">
                <path id="shapePath" d="M -44,-50 C -52.71,28.52 15.86,8.186 184,14.69 383.3,22.39 462.5,12.58 638,14 835.5,15.6 987,6.4 1194,13.86 1661,30.68 1652,-36.74 1582,-140.1 1512,-243.5 15.88,-589.5 -44,-50 Z" pathdata:id="M -44,-50 C -137.1,117.4 67.86,445.5 236,452 435.3,459.7 500.5,242.6 676,244 873.5,245.6 957,522.4 1154,594 1593,753.7 1793,226.3 1582,-126 1371,-478.3 219.8,-524.2 -44,-50 Z"></path>
            </svg>
        </div>
    </section>
</template>