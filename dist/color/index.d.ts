export declare function hexToRgb(hexColor: string): [number, number, number];
export declare function rgbToHex(r: number, g: number, b: number): string;
/**
 * Interpolates between two colors based on a given factor.
 * @param color1 The starting color in hexadecimal format.
 * @param color2 The ending color in hexadecimal format.
 * @param t The interpolation factor between 0 and 1.
 * @returns The interpolated color in hexadecimal format.
 */
export declare function interpolateColor(color1: string, color2: string, t: number): string;
