

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


/**
 * Generates a random number from a standard normal distribution (mean = 0, standard deviation = 1).
 * Uses the Box-Muller transform to generate normally distributed random numbers.
 * 
 * @returns A random number from a standard normal distribution.
 */
export function randNormal(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Generate a random number (0,1]
    while (v === 0) v = Math.random(); // Generate a random number (0,1]

    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z;
}


/**
 * Generate a random number following a skewed normal distribution within a specified range.
 * 
 * @param min - The minimum value of the range (default: -3.6).
 * @param max - The maximum value of the range (default: 3.6).
 * @param skew - The skewness factor of the distribution (default: 1).
 * @returns A random number within the specified range following a skewed normal distribution.
 */
export function randn(min: number = -3.6, max: number = 3.6, skew: number = 1): number {
    // Normal Distribution.

    let u: number = 0, v: number = 0;
    while (u === 0) u = Math.random(); // converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num: number = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    num = num / 10.0 + 0.5; // translate to 0 -> 1
    if (num > 1 || num < 0)
        num = randn(min, max, skew); // resample between 0 and 1 if out of range

    else {
        num = Math.pow(num, skew); // skew
        num *= max - min; // stretch to fill range
        num += min; // offset to min
    }
    return num;
}


/**
 * Generates a random hexadecimal "hash" of the specified length.
 *
 * @param length The desired length of the hexadecimal hash.
 * @returns A random hexadecimal hash (example: c05d14dba9).
 */
export function generateHexHash(length: number): string {
    const chars = '0123456789abcdef';
    let uid = '';

    for (let i = 0; i < length; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        uid += chars.charAt(idx);
    }

    return uid;
}
