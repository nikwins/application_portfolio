import anime from 'animejs/lib/anime.es.js'

export const useLoaderAnimation = () => {
    const runLoaderAnimation = (el: HTMLElement) => {
        const loader = el.querySelector('#sectionLoader') as HTMLElement
        const shape = el.querySelector('#shape') as HTMLElement
        const shapePath = el.querySelector('#shapePath') as HTMLElement

        if (loader) {
            anime({
                targets: loader,
                duration: 1100,
                easing: 'easeInOutSine',
                translateY: '-200vh'
            })
        }

        if (shape) {
            anime({
                targets: shape,
                scaleY: [
                    { value: [0.8, 1.8], duration: 550, easing: 'easeInQuad' },
                    { value: 1, duration: 550, easing: 'easeOutQuad' }
                ]
            })
        }

        if (shapePath) {
            anime({
                targets: shapePath,
                duration: 1100,
                easing: 'easeOutQuad',
                d: shapePath.getAttribute('pathdata:id')
            })
        }
    }

    return { runLoaderAnimation }
}