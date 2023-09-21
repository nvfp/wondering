

/**
 * Linearly interpolate between `value1` and `value2`.
 * If `t` is `tMin`, return `value1`. If `t` is `tMax`, return `value2`.
 *
 * @param {number} value1 - The first value.
 * @param {number} value2 - The second value.
 * @param {number} tMin - The minimum interpolation parameter value.
 * @param {number} tMax - The maximum interpolation parameter value.
 * @param {number} t - The interpolation parameter value.
 * @returns {number} The interpolated value.
 */
export function interpTwoValues(value1: number, value2: number, tMin: number, tMax: number, t: number): number {
    return value1 + (t - tMin) * (value2 - value1) / (tMax - tMin);
}
