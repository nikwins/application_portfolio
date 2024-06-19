<script setup lang="ts">
interface Props {
    text: string,
    to?: string,
    size?: 'small' | 'default' | 'large',
    variant?: 'teal',
    target?: string,
    align?: 'left' | 'center' | 'right'
}
const props = withDefaults(defineProps<Props>(), {
    size: 'default',
    variant: 'teal',
    align: 'left'
})
const component = computed(() => {
    if (props.to) return resolveComponent('NuxtLink')
    return 'button'
})
</script>
<template>
    <component 
        :is="component"
        :to="props.to"
        :target="props.target ? props.target : ''"
        :class="[
            'inline-block bg-transparent border border-teal-400 rounded-lg transition ease-stamp',
            props.size == 'small' ? 'px-mdlg py-mdsm text-sm hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[2px_2px_0_0]' : props.size == 'large' ? 'px-8 py-mdlg text-md hover:translate-x-[-6px] hover:translate-y-[-6px] hover:shadow-[4px_4px_0_0]' : 'px-lg py-base text-base hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[3px_3px_0_0]',
            props.variant == 'teal' ? 'text-primary border-primary hover:shadow-primary' : '',
            props.align == 'center' ? 'mx-auto' : props.align == 'right' ? 'ml-auto' : ''
        ]"  
    >
        <span class="flex items-center">
            {{ props.text }}
        </span>
        <slot />
    </component>
</template>