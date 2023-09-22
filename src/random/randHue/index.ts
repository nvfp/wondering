import { randInt } from "../index.js";
import { hslToRgb, rgbToHex } from "../../color/index.js";


/**
 * Generates a random color in HSL format with the given saturation and lightness, and returns it in hexadecimal format.
 * 
 * @param s - The saturation value (0 to 100).
 * @param l - The lightness value (0 to 100).
 * @returns A random color in hexadecimal format (e.g., "#RRGGBB").
 */
export function randHue(s: number, l: number): string {
    // Generate a random hue value (0 to 359 degrees)
    let h = randInt(0, 359);

    // Convert HSL to RGB
    let [r, g, b] = hslToRgb(h, s, l);

    // Convert RGB to hexadecimal format
    return rgbToHex(r, g, b);
}
