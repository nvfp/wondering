

/**
 * Returns a random number (float) between min (inclusive) and max (exclusive):
 * [min,max)→R
 */
export function randFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min
}


/**
 * Returns a random integer between min (inclusive) and max (inclusive):
 * [min,max]→Z
 */
export function randInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Returns a random element from the given array.
 * @param array The array from which to choose a random element.
 * @returns A randomly selected element from the array.
 */
export function randChoice<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
