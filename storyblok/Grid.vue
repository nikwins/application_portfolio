<script setup lang="ts">
const props = defineProps<{
    blok: Grid
}>()

interface Grid {
    _uid: string,
    theme: {value: string},
    columns: object,
    container_width?: string,
    curvy_divider: boolean,
    curvy_divider_secondary: boolean,
    secondary_color: {value: string},
    max_columns_per_row: string,
    max_columns_xs?: string,
    max_columns_sm?: string,
    max_columns_md?: string,
    max_columns_lg?: string,
    max_columns_xl?: string,
    max_columns_2xl?: string,
    vertical_spacing?: string,
    custom_vertical_spacing_xs?: string,
    custom_vertical_spacing_sm?: string,
    custom_vertical_spacing_md?: string,
    custom_vertical_spacing_lg?: string,
    custom_vertical_spacing_xl?: string,
    custom_vertical_spacing_2xl?: string,
    gap?: string,
    custom_gap_xs?: string,
    custom_gap_sm?: string,
    custom_gap_md?: string,
    custom_gap_lg?: string,
    custom_gap_xl?: string,
    custom_gap_2xl?: string,
}

const columns = computed(() => {
    switch(props.blok.max_columns_per_row) {
        case 'custom':
            return {
                xs: props.blok.max_columns_xs,
                sm: props.blok.max_columns_sm,
                md: props.blok.max_columns_md,
                lg: props.blok.max_columns_lg,
                xl: props.blok.max_columns_xl,
                '2xl': props.blok.max_columns_2xl,
            }
            break;
        case '1':
            return {
                xs: '1',
                sm: '1',
                md: '1',
                lg: '1',
                xl: '1',
                '2xl': '1',
            }
            break;
        case '2':
            return {
                xs: '1',
                sm: '1',
                md: '2',
                lg: '2',
                xl: '2',
                '2xl': '2',
            }
            break;
        case '3':
            return {
                xs: '1',
                sm: '1',
                md: '2',
                lg: '2',
                xl: '3',
                '2xl': '3',
            }
            break;
        case '4':
            return {
                xs: '1',
                sm: '1',
                md: '2',
                lg: '3',
                xl: '4',
                '2xl': '4',
            }
            break;
        default:
            return {
                xs: '1',
                sm: '1',
                md: '2',
                lg: '2',
                xl: '3',
                '2xl': '3',
            }
    }
})
const verticalSpacing = computed(() => {
    switch(props.blok.vertical_spacing) {
        case 'base':
            return 'py-base lg:py-lg 2xl:py-xl'
            break
        case '0':
            return 'py-0'
            break
        case 'xs':
            return 'py-xs lg:py-sm 2xl:py-base'
            break
        case 'sm':
            return 'py-sm lg:py-mdsm 2xl:py-mdlg'
            break
        case 'lg':
            return 'py-lg lg:py-xl 2xl:py-2xl'
            break
        case 'xl':
            return 'py-xl lg:py-2xl 2xl:py-3xl'
            break
        case '2xl':
            return 'py-2xl lg:py-3xl 2xl:py-4xl'
            break
        case 'custom':
            return 'py-' + props.blok.custom_vertical_spacing_xs + ' sm:py-' + props.blok.custom_vertical_spacing_sm + ' md:py-' + props.blok.custom_vertical_spacing_md  + ' lg:py-' + props.blok.custom_vertical_spacing_lg  + ' xl:py-' + props.blok.custom_vertical_spacing_xl  + ' 2xl:py-' + props.blok.custom_vertical_spacing_2xl 
            break
        default:
            return 'py-base lg:py-lg 2xl:py-xl'
            break
    }
})
const gap = computed(() => {
    if (props.blok.gap == 'custom') {
        return 'gap-' + props.blok.custom_gap_xs + ' sm:gap-' + props.blok.custom_gap_sm + ' md:gap-' + props.blok.custom_gap_md  + ' lg:gap-' + props.blok.custom_gap_lg  + ' xl:gap-' + props.blok.custom_gap_xl  + ' 2xl:gap-' + props.blok.custom_gap_2xl
    }
    return 'gap-' + props.blok?.gap
})

const theme = computed(() => {
    switch(props.blok?.theme.value) {
        case '#1f2937':
            return 'before:bg-[#1f2937] text-bodyTextColor'
            break
        case '#111827':
            return 'before:bg-[#111827] text-bodyTextColor'
            break
        default:
            return 'before:bg-[#111827] text-bodyTextColor'
            break
    }
})
</script>
<template>
    <section 
    v-editable="props.blok" 
    :id="blok._uid"
    :class="[
        'relative mx-auto grid place-items-start w-full',
        props.blok.container_width == 'full_width' ? 'alignfull' : '',
        props.blok.container_width == 'narrow' ? 'max-w-[1000px]' : '',
        props.blok.theme.value ? 'before:absolute before:w-screen before:h-full before:-z-[1] before:-right-base sm:before:right-[calc(((100vw_-_theme(screens.sm))_/_-2)_-_(theme(spacing.base)))] md:before:right-[calc(((100vw_-_theme(screens.md))_/_-2)_-_(theme(spacing.base)))]' + ' ' + theme : '',
        props.blok.container_width == 'default' && props.blok.theme.value ? 'lg:before:right-[calc(((100vw_-_theme(screens.lg))_/_-2)_-_(theme(spacing.base)))] xl:before:right-[calc(((100vw_-_theme(screens.xl))_/_-2)_-_(theme(spacing.base)))] 2xl:before:right-[calc(((100vw_-_theme(screens.2xl))_/_-2)_-_(theme(spacing.base)))]' : '',
        props.blok.container_width == 'narrow' && props.blok.theme.value ? 'lg:before:right-[calc(((100vw_-_1000px)_/_-2))]' : '',
        verticalSpacing,
        gap,
        'grid-cols-' + columns.xs,
        'sm:grid-cols-' + columns.sm,
        'md:grid-cols-' + columns.md,
        'lg:grid-cols-' + columns.lg,
        'xl:grid-cols-' + columns.xl,
    ]">
        <CurvyDivider v-if="props.blok.curvy_divider" :container_width="props.blok.container_width ? props.blok.container_width : 'default'" :primaryColor="props.blok.theme.value" :secondary="props.blok.curvy_divider_secondary" :secondaryColor="props.blok.secondary_color ? props.blok.secondary_color.value : ''" />
        <StoryblokComponent v-for="blok in props.blok.columns" :key="blok" :blok="blok" />
    </section>
</template>