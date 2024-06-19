<script setup lang="ts">
interface Props {
    words: string[],
    interval?: number,
    currentWord?: number,
    text_before?: string,
    size: number | string,
    highlight?: boolean,
    delay?: number
}
const props = withDefaults(defineProps<Props>(), {
    highlight: false,
    currentWord: 0,
    interval: 4000,
    delay: 2000
})

interface WordObject {
    name: string,
    letters: letterObject[],
    active: boolean
}
interface letterObject {
    letter: string,
    class?: string
}
interface HeadingClasses {
    [key: string]: string
}

let currentWord = props.currentWord !== undefined ? props.currentWord : 0
let wordsArray = ref<WordObject[]>([])

const splitLetters = (word: string) => {
    let letters: letterObject[] = []

    for (var i = 0; i < word.length; i++) {
        const char: string = word.charAt(i).indexOf(' ') >= 0 ? '&nbsp;' : word.charAt(i)
        letters.push({letter: char})
    }
    wordsArray.value.push({
        name: word,
        letters: letters,
        active: false
    })
}

const changeWord = () => {
    const cw = wordsArray.value[currentWord]
    const nw = currentWord == wordsArray.value.length - 1 ? wordsArray.value[0] : wordsArray.value[currentWord + 1]

    for (var i = 0; i < cw.letters.length; i++) {
        animateLetterOut(cw, i)
    }
    for (var i = 0; i < nw.letters.length; i++) {
        nw.letters[i].class = 'letter behind'
        animateLetterIn(nw, i)
    }

    currentWord = (currentWord == wordsArray.value.length-1) ? 0 : currentWord+1
    wordsArray.value[currentWord].active = true
}

const animateLetterOut = (cw: WordObject, i: number) => {
    setTimeout(function() {
        cw.letters[i].class = 'letter out'
    }, i*80)
}

const animateLetterIn = (nw: WordObject, i: number) => {
    setTimeout(function() {
        nw.letters[i].class = 'letter in'
    }, 340+(i*80))
}

for (var i = 0; i < props.words.length; i++) {
    splitLetters(props.words[i])
}
wordsArray.value[currentWord].active = true

const headingClasses: HeadingClasses = {
    'h1': 'text-[calc(1.45rem_+_1.8vw)] inline font-bold leading-tight lg:text-h1',
    'h2': 'text-[calc(1.3875rem_+_1.65vw)] inline font-bold leading-tight lg:text-h2',
    'h3': 'text-[calc(1.35rem_+_1.2vw)] inline font-bold leading-tight lg:text-h3',
    'h4': 'text-[calc(1.3125rem_+_0.75vw)] inline font-bold leading-tight lg:text-h4',
    'h5': 'text-h5 inline font-bold leading-tight',
    'h6': 'text-h6 inline font-bold leading-tight',
}
const titleClasses: Ref<string> = computed(() => {
    return headingClasses['h' + props.size]
})

onMounted(() => {
    setTimeout(() => {
        changeWord()
        setInterval(changeWord, props.interval)
    }, props.delay)
})

</script>
<style>
.letter.out {
    transform: rotateX(90deg);
    transition: transform 0.32s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.letter.behind {
    transform: rotateX(-90deg);
}
.letter.in {
    transform: rotateX(0deg);
    transition: transform 0.38s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
<template>
    <div class="inline-block">
        <span v-if="props.text_before" :class="[titleClasses, props.highlight ? '!inline-block sm:mr-base' : '']">{{ props.text_before }}&nbsp;</span>
        <p :class="[titleClasses, props.highlight ? '!block mt-base sm:!inline sm:mt-0' : '']">
            <span 
                v-for="word in wordsArray" :key="word.name"
                :class="[
                    'absolute', 
                    props.highlight ? 'before:absolute before:-top-sm before:-bottom-sm before:-left-base before:-right-base before:bg-primary before:z-[-1] text-bodyBgColor' : '',
                    word.active ? 'opacity-100' : 'opacity-0'
                ]"
            >
                <span 
                    v-for="letter in word.letters" :key="letter.letter"
                    v-html="letter.letter"
                    :class="[
                        'inline-block relative origin-[50%_50%_20px]',
                        letter.class
                    ]"
                    :style="!letter.class ? 'transform: translateZ(20px)' : ''"
                ></span>
            </span>
        </p>
    </div>
</template>