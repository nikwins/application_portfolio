<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const props = defineProps<{
    blok: {
        tab: {
            title: string,
            content: {
                _uid: string
            }[]
        }[],
        has_experience_tabs: boolean
    }
}>()
</script>

<template>
    <div>
        <TabGroup>
            <TabList class="w-full mb-base sm:flex lg:mb-0">
                <Tab 
                    v-for="tab in props.blok.tab" :key="tab.title"
                    :class="[
                        'w-full py-base px-lg mb-mdsm bg-gray-800 border-b-2 text-white transition-colors rounded',
                        'ui-selected:border-primary ui-selected:font-bold ui-selected:text-primary ui-selected:rounded-b-none',
                        'hover:!border-primary hover:!rounded-b-none focus-visible:outline-none sm:[&(not:(:last-child))]:mr-base sm:mb-0 sm:w-auto lg:[&(not:(:last-child))]:mr-lg',
                        props.blok.has_experience_tabs ? 'lg:rounded-b-none ui-not-selected:!border-gray-800 hover:ui-not-selected:!border-primary' : 'ui-not-selected:border-bodyBgColor'
                    ]"
                >{{ tab.title }}</Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="tab in props.blok.tab" :key="tab.title">
                    <StoryblokComponent v-for="blok in tab.content" :key="blok._uid" :blok="blok" />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>