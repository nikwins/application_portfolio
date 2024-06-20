<script setup lang="ts">
interface Props {
    size: number | string,
    title: string,
    subtitle?: string,
    semantic?: boolean,
    align?: 'left' | 'center' | 'right',
    color_variant?: 'teal' | 'white' | 'dark',
    show_subtitle_above?: boolean
}
interface HeadingClasses {
    [key: string]: string
}
const props = withDefaults(defineProps<Props>(), {
    semantic: true,
    align: 'left',
    color_variant: 'white',
    show_subtitle_above: false
})
const commonHeadingClasses = 'inline font-bold leading-tight transition-colors '
const headingClasses: HeadingClasses = {
    'h1': commonHeadingClasses + 'text-[calc(1.45rem_+_1.8vw)] lg:text-h1',
    'h2': commonHeadingClasses + 'text-[calc(1.3875rem_+_1.65vw)] lg:text-h2',
    'h3': commonHeadingClasses + 'text-[calc(1.35rem_+_1.2vw)] lg:text-h3',
    'h4': commonHeadingClasses + 'text-[calc(1.3125rem_+_0.75vw)] lg:text-h4',
    'h5': commonHeadingClasses + 'text-h5',
    'h6': commonHeadingClasses + 'text-h6',
}
const subHeadingClasses: HeadingClasses = {
    'h1': 'text-h5 leading-tight',
    'h2': 'text-h6 leading-tight',
    'h3': 'text-base leading-tight',
    'h4': 'text-sm leading-tight',
    'h5': 'text-sm leading-tight',
    'h6': 'text-xs leading-tight',
}
const titleSize: Ref<string> = computed(() => {
    return 'h' + props.size
})
const titleClasses: Ref<string> = computed(() => {
    let color: string = '';
    if (!props.subtitle && props.color_variant == 'teal') {    
        color = ' text-primary '
    } else if (!props.subtitle && props.color_variant == 'dark') {  
        color = ' text-bodyBgColor ' 
    } else {
        color = ' text-white '
    }
    return headingClasses[titleSize.value] + color
})
const subTitleClasses: Ref<string> = computed(() => {
    let color: string = '';
    let margin: string = props.show_subtitle_above ? 'mb-sm' : 'mt-sm'

    if (props.color_variant == 'teal') {
        color = ' text-primary '
    } else if (props.color_variant == 'dark') {  
        color = ' text-bodyBgColor ' 
    } else {
        color = ' text-white '
    }
    return subHeadingClasses[titleSize.value] + color + margin
})
</script>
<template>
    <div :class="['block w-full mb-sm lg:mb-mdsm', 'text-' + props.align]">
        <p v-if="props.subtitle && props.show_subtitle_above" :class="subTitleClasses" v-html="props.subtitle"></p>
        <component v-bind:is="!semantic ? 'p' : titleSize" :class="[titleClasses]" v-html="props.title"></component>
        <p v-if="props.subtitle && !props.show_subtitle_above" :class="subTitleClasses" v-html="props.subtitle"></p>
        <slot />
    </div>
</template>