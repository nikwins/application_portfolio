<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div class="container text-center">
        <div class="h-screen flex flex-col flex-wrap justify-center items-center">
            <h1 class="text-primary" style="font-size: 10rem;">{{ error.statusCode }}</h1>
            <p class="lead">{{ $t('general.errorText') }}</p>
            <BasicButton @click="handleError" :text="$t('general.backToStart')" class="mt-xl"></BasicButton>
        </div>
    </div>
</template>