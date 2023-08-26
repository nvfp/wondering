/**
 * Returns a random number (float) between min (inclusive) and max (exclusive):
 * [min,max)→R
 */
export declare function randFloat(min: number, max: number): number;
/**
 * Returns a random integer between min (inclusive) and max (inclusive):
 * [min,max]→Z
 */
export declare function randInt(min: number, max: number): number;
/**
 * Returns a random element from the given array.
 * @param array The array from which to choose a random element.
 * @returns A randomly selected element from the array.
 */
export declare function randChoice<T>(array: T[]): T;
