<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
const props = defineProps<{
    blok: {
        tabs: {
            name: string,
            job_title: string,
            company_name: string,
            company_link: {
                url: string,
                target: string
            },
            start: string,
            end: string,
            content: {
                text: string,
                type: string
            }
        }[]
    }
}>()
const selectedTab = ref<number>(0)

const changeTab = (index: number) => {
    selectedTab.value = index
}

const indicatorTopDistance = computed(() => {
    return selectedTab.value * 56 + 'px'
})
</script>
<template>
    <div class="relative bg-gray-800/50 w-full flex flex-col rounded-xl lg:rounded-tl-none lg:flex-row lg:p-xl" v-editable="props.blok">
        <TabGroup @change="changeTab" vertical>
            <TabList class="absolute left-0 right-0 flex overflow-x-scroll rounded-t-xl lg:relative lg:flex-col lg:rounded-t-none lg:w-80 lg:overflow-x-hidden">
                <div class="hidden absolute -left-[1px] w-xs h-14 bg-primary transition-all delay-100 lg:block" :style="'top:' + indicatorTopDistance"></div>
                <Tab 
                    v-for="tab in props.blok.tabs" :key="tab.name + '_trigger'" 
                    v-slot="{ selected }"
                    as="template"
                >
                    <button 
                        :class="[
                            'text-left border-b-2 border-gray-800 h-14 px-lg text-nowrap transition focus:outline-none lg:border-l-2 lg:border-b-0 lg:hover:bg-gray-800',
                            selected ? 'bg-gray-800 text-primary lg:text-white' : ''
                        ]"
                    >
                        {{ tab.name }}
                    </button>
                </Tab>
            </TabList>
            <TabPanels class="px-xl pb-xl pt-24 w-full lg:pt-0 lg:pl-xl lg:pr-0">
                <TabPanel v-for="tab in props.blok.tabs" :key="tab.name + '_panel'">
                    <h3 class="text-lg mb-xs text-white">
                        <span class="text-primary font-bold">{{ tab.job_title }}</span>
                        <component 
                            :is="tab.company_link.url ? 'a' : 'span'" 
                            :href="tab.company_link.url" 
                            :target="tab.company_link.target" 
                            :class="tab.company_link.url ? 'transition-opacity hover:opacity-80' : ''"
                        > @ {{ tab.company_name }}</component>
                    </h3>
                    <div class="opacity-80">
                        <p class="mb-lg">
                            {{ tab.start }} - {{ tab.end }}
                        </p>
                        <Content :blok="{ content: tab.content }" />
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>