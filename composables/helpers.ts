export const debounce = <T extends (...args: any[]) => void>(
    fn: T,
    delay = 0,
    immediate = false
) => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<T>) => {
        const later = () => {
            timeout = undefined;
            if (!immediate) fn(...args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);

        if (callNow) fn(...args);
    };
};