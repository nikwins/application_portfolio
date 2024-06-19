<script setup lang="ts">
import { debounce } from '@/composables/helpers'
import anime from 'animejs/lib/anime.es.js'
import { useWindowSize } from '@vueuse/core'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

interface Props {
    maxWidth?: number,
    maxElementsInRow?: number,
    minElementsInRow?: number,
    heightOnPhones?: number,
    heightOnTablet?: number,
    screenMaxWidth?: number,
    transitionDuration?: number,
    mobileAnimationRestartDelay?: number,
    squareColorActive?: string,
    squareColorInactive?: string,
    squareColorShaded?: string,
    waveSpeed?: number,
}

const props = withDefaults(defineProps<Props>(), {
    maxWidth: 1526,
    maxElementsInRow: 19,
    minElementsInRow: 12,
    heightOnPhones: 300,
    heightOnTablet: 400,
    screenMaxWidth: 2560,
    transitionDuration: 400,
    mobileAnimationRestartDelay: 2000,
    squareColorActive: '#2dd4bf',
    squareColorInactive: '#111827',
    squareColorShaded: '#0f172a',
    waveSpeed: 3.25 // higher means faster
})

breakpointsTailwind.sm = 576
const breakpoints = useBreakpoints(breakpointsTailwind)

const { width, height } = useWindowSize()
const animatedSquares = ref()
const revealSquaresRef = ref()
const animateSquaresRef = ref()
const restartSquaresRef = ref()
const squareClasses = ref<string[]>([])
const clickedIndex = ref<number | undefined>(undefined)

const elementsInRow = computed(() => {
    if (breakpoints.smaller('xl').value) {
        return props.minElementsInRow
    }
    return props.maxElementsInRow
})
const svgWidth = computed(() => {
    if (breakpoints.smallerOrEqual('lg').value) {
        return width.value
    }
    if (breakpoints.between('lg', 'xl').value) {
        return width.value / 1.85
    }
    return width.value * (props.maxWidth / props.screenMaxWidth)
})
const svgHeight = computed(() => {
    if (breakpoints.smaller('md').value) {
        return props.heightOnPhones
    }
    if (breakpoints.smallerOrEqual('lg').value) {
        return props.heightOnTablet
    }
    return height.value
})
const squareSize = computed(() => {
    return svgWidth.value / elementsInRow.value
})
const rowsToFillScreen = computed(() => {
    return Math.ceil(svgHeight.value / squareSize.value)
})
const squaresToFillCanvas = computed(() => {
    return (rowsToFillScreen.value * elementsInRow.value) - 1
})

const revealSquares = (index?: number, initial?: boolean): void => {
    const startIndex:number = index !== undefined ? index : breakpoints.greater('lg').value ? findUpperRightSquareIndex() : findDownCenterSquareIndex()
    const initialReveal: boolean = initial === false ? false : true

    if (!initialReveal) {
        (document.querySelectorAll('.animated-squares .square') as NodeListOf<HTMLElement>).forEach((el) => {
            let dataIndex: number | undefined = undefined

            if (el.dataset.index) {
                if (parseInt(el.dataset.index) === 0) {
                    dataIndex = squareClasses.value.length - 1
                } else {
                    dataIndex = parseInt(el.dataset.index) - 1
                }
                el.classList.remove('square--colorize', 'fill-bodyBgColor')
                el.classList.add(squareClasses.value[dataIndex])
            }
        })
    }
    
    revealSquaresRef.value = anime({
        targets: '.animated-squares .square.square--colorize',
        fill: [
            { value: props.squareColorInactive, duration: 0 },
            { value: props.squareColorActive, duration: props.transitionDuration },
        ],
        opacity: 1,
        delay: (el) => calculateDelay(el, startIndex) as number,
        complete: () => {
            if (breakpoints.greater('lg').value) {
                animateSquares()
            } else {
                setTimeout(restartAnimation, props.mobileAnimationRestartDelay)
            }
        },
        easing: 'easeInOutQuad'
    })
}
const animateSquares = (index?: number): void => {
    const startIndex = index ? index : Math.floor(Math.random() * squaresToFillCanvas.value)

    animateSquaresRef.value = anime({
        targets: '.animated-squares .square.square--colorize',
        fill: [
            { value: props.squareColorActive, duration: 0 },
            { value: props.squareColorShaded, duration: props.transitionDuration },
            { value: props.squareColorActive, duration: props.transitionDuration * 2 },
        ],
        delay: (el) => calculateDelay(el, startIndex) as number,
        complete: () => {
            animateSquares()
        },
        easing: 'easeInOutQuad'
    })
}
const calculateDelay = (el: HTMLElement, startIndex: number, multiplicator?: number): number => {
    const speed = multiplicator ? multiplicator : props.waveSpeed

    const x = getXValue(startIndex) + squareSize.value / 2
    const y = getYValue(startIndex) + squareSize.value / 2
    const targetX = getXValue(Number(el.dataset.index)) + squareSize.value / 2
    const targetY = getYValue(Number(el.dataset.index)) + squareSize.value / 2
    const distance = Math.sqrt((x - targetX) ** 2 + (y - targetY) ** 2)
    return distance * speed
}
const removeAnimations = (): void => {
    if (revealSquaresRef.value) {
        revealSquaresRef.value.remove('.animated-squares .square.square--colorize')
    }
    if (animateSquaresRef.value) {
        animateSquaresRef.value.remove('.animated-squares .square.square--colorize')
    }
    if (restartSquaresRef.value) {
        restartSquaresRef.value.remove('.animated-squares .square')
    }
}
const restartAnimation = (event?: Event): void => {
    let indexToStartFrom = 0

    if (event) {
        const target = event.target as HTMLElement
        
        if (target.tagName.toLowerCase() === 'rect') {
            const dataIndex: number = Number(target.dataset.index)
            clickedIndex.value = dataIndex
            indexToStartFrom = dataIndex
        }
    } else {
        indexToStartFrom = findDownCenterSquareIndex()
    }
    removeAnimations()
    squareClasses.value = []
    squareClasses.value = Array.from({ length: squaresToFillCanvas.value }, (_, index) =>
        randomizeBgColor(index + 1) ? 'fill-bodyBgColor' : 'square--colorize'
    )

    restartSquaresRef.value = anime({
        targets: '.animated-squares .square',
        opacity: 0,
        duration: props.transitionDuration,
        easing: 'easeInOutQuad',
        complete: () => {
            revealSquares(indexToStartFrom, false)
        }
    })
}
const findUpperRightSquareIndex = (): number => {
    const squares = animatedSquares.value.querySelectorAll('.square--colorize')
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i] as HTMLElement
        const index = Number(square.dataset.index)
        const x = getXValue(index)
        const y = getYValue(index)

        if (x === (elementsInRow.value - 1) * squareSize.value && y === 0) {
            return index
        }
    }
    return 0
}
const findDownCenterSquareIndex = (): number => {
    return squaresToFillCanvas.value - (Math.floor(elementsInRow.value / 2))
}
const getXValue = (index: number): number => {
    return (index % elementsInRow.value) * squareSize.value
}
const getYValue = (index: number): number => {
    return Math.floor(index / elementsInRow.value) * squareSize.value
}
const randomizeBgColor = (index: number): boolean => {
    if (clickedIndex.value === index) {
        return false
    }
    const positionInRow: number = index % elementsInRow.value
    let probability: number = 1
    const row: number = Math.floor(index / elementsInRow.value)

    if (breakpoints.smallerOrEqual('lg').value) {
        const middlePosition: number = Math.floor(elementsInRow.value / 2)
        const distanceToMiddlePosition: number = Math.abs(positionInRow - middlePosition)
        const maxDistanceToMiddlePosition: number = Math.abs(elementsInRow.value - middlePosition)
        let horizontalProbabilityModificator: number = 1 - ( distanceToMiddlePosition / maxDistanceToMiddlePosition )
        probability = ( row / rowsToFillScreen.value ) + ( horizontalProbabilityModificator / 3 )
    } else {
        if (row + 1 == rowsToFillScreen.value) {
            return false
        }
        probability = positionInRow / elementsInRow.value
    }
    return Math.random() > probability
}

onMounted(() => {
    revealSquares()

    if (breakpoints.greater('lg').value) {
        animatedSquares.value.addEventListener("click", restartAnimation)
    }
    window.addEventListener('resize', debounce(() => {
        removeAnimations()
        if (breakpoints.greater('lg').value) {
            if (animatedSquares.value) {
                animatedSquares.value.addEventListener("click", restartAnimation)
            }
        } else {
            if (animatedSquares.value) {
                animatedSquares.value.removeEventListener("click", restartAnimation)
            }
        }
    }, 250))
})
onUnmounted(() => {
    removeAnimations()
    if (animatedSquares.value) {
        animatedSquares.value.removeEventListener("click", restartAnimation)
    }
})
</script>
<template>
    <section class="alignfull relative z-0 flex flex-col overflow-hidden min-h-screen" :style="'height: ' + svgHeight + 'px;'">
        <div class="container flex items-center flex-grow">
            <div class="relative z-10 w-full pointer-events-none lg:w-1/2 lg:!pb-2xl xl:w-2/5" :style="'padding-bottom:' + svgHeight + 'px;'">
                <slot />
            </div>
            <div class="absolute bottom-0 right-0 z-0 w-full md:-bottom-base lg:bottom-0 xl:w-3/5 xl:top-0" :style="'height: ' + svgHeight + 'px;'">
                <div class="flex justify-end w-full h-full">
                    <svg ref="animatedSquares" class="animated-squares cursor-crosshair" :width="svgWidth" :height="svgHeight" shape-rendering="crispEdges">
                        <rect 
                            v-for="index in squaresToFillCanvas" 
                            :class="[
                                'square fill-transparent', 
                                randomizeBgColor(index) ? 'fill-bodyBgColor' : 'square--colorize'
                            ]"  
                            :data-index="index"
                            :x="getXValue(index)" 
                            :y="getYValue(index)" 
                            :width="squareSize" 
                            :height="squareSize"
                        ></rect>
                    </svg>
                </div>
            </div>
        </div>
    </section>
</template>