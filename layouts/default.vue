<script setup lang="ts">
import { debounce } from '@/composables/helpers'
import { useWindowSize } from '@vueuse/core'

const { height } = useWindowSize()
const { locale, locales } = useI18n()
const currentLocale = computed(() => {
    return (locales.value).filter(i => i.code === locale.value)
})
const route = useRoute()
const { t } = useI18n()
const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: 'id',
    addSeoAttributes: true
})
const setViewportHeight = () => {
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${height.value}px`)
}
onMounted(() => {
    setViewportHeight()

    window.addEventListener('resize', debounce(() => {
        setViewportHeight()
    }, 250))
})

onUnmounted(() => {
    window.removeEventListener('resize', setViewportHeight)
})


</script>
<template>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
        <Head>
            <Title>{{ $t('general.title') }}</Title>

            <template v-for="link in head.link" :key="link.id">
                <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
            </template>
            <template v-for="meta in head.meta" :key="meta.id">
                <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
            </template>
        </Head>
        <Body>
            <div id="page" class="relative flex flex-col min-h-[100vh] min-h-[calc(var(--vh))] pt-20">
                <TheHeader :currentLocale="currentLocale[0].code" />
                
                <GlowPointer />
                
                <main id="mainContent" class="flex-1 overflow-hidden">
                    <div class="container">
                        <slot />
                    </div>
                </main>
                <TheFooter :currentLocale="currentLocale[0].code" />
            </div>
        </Body>
    </Html>
</template>