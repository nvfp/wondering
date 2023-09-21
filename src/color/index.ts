

export function hexToRgb(hexColor: string): [number, number, number] {
    hexColor = hexColor.replace('#', '');
    return [
        parseInt(hexColor.substring(0, 2), 16),
        parseInt(hexColor.substring(2, 4), 16),
        parseInt(hexColor.substring(4, 6), 16)
    ];
}

export function rgbToHex(r: number, g: number, b: number): string {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}


/**
 * Interpolates between two colors based on a given factor.
 * @param color1 The starting color in hexadecimal format (should be in format "#ff0000").
 * @param color2 The ending color in hexadecimal format.
 * @param t The interpolation factor between 0 and 1.
 * @returns The interpolated color in hexadecimal format.
 */
export function interpolateColor(color1: string, color2: string, t: number): string {
    // DEMO
    // >>> interpolateColor('#ff0000', '#0000ff', 0.0)
    // '#ff0000'
    // >>> interpolateColor('#ff0000', '#0000ff', 0.5)
    // '#800080'
    // >>> interpolateColor('#ff0000', '#0000ff', 1.0)
    // '#0000ff'
    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);

    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);

    return rgbToHex(r, g, b);
}


/**
 * Trilinear interpolation between three colors based on a given factor.
 * @param color1 The first color in hexadecimal format (should be in format "#ff0000").
 * @param color2 The second color in hexadecimal format.
 * @param color3 The third color in hexadecimal format.
 * @param mid The midpoint between color1 and color3, a value between 0 and 1 exclusive.
 * @param t The interpolation factor between 0 and 1.
 * @returns The interpolated color in hexadecimal format.
 */
export function trilinearInterpolation(color1: string, color2: string, color3: string, mid: number, t: number): string {
    let w1: number, w2: number, w3: number;

    if (t < mid) {
        w1 = (mid - t) / mid;
        w2 = t / mid;
        w3 = 0;
    } else {
        w1 = 0;
        w2 = (1 - t) / (1 - mid);
        w3 = (t - mid) / (1 - mid);
    }

    const [r1, g1, b1] = hexToRgb(color1);
    const [r2, g2, b2] = hexToRgb(color2);
    const [r3, g3, b3] = hexToRgb(color3);

    const r = Math.round(r1 * w1 + r2 * w2 + r3 * w3);
    const g = Math.round(g1 * w1 + g2 * w2 + g3 * w3);
    const b = Math.round(b1 * w1 + b2 * w2 + b3 * w3);

    return rgbToHex(r, g, b);
}


/**
 * Converts HSL (Hue, Saturation, Lightness) values to RGB (Red, Green, Blue) color.
 *
 * @param {number} h - Hue value in the interval [0, 359].
 * @param {number} s - Saturation value in the interval [0, 100].
 * @param {number} l - Lightness value in the interval [0, 100].
 * @returns {number[]} An array containing the RGB values in the range [0, 255].
 */
export function hslToRgb(h: number, s: number, l: number): number[] {
    // Convert input values to fractions
    const h_frac = (Math.abs(h) % 360) / 359;
    const s_frac = Math.min(100, Math.max(0, s)) / 100;
    const l_frac = Math.min(100, Math.max(0, l)) / 100;

    // Helper function to convert hue to RGB
    function hueToRgb(p: number, q: number, t: number): number {
        t += (t < 0) ? 1 : 0;
        t -= (t > 1) ? 1 : 0;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }

    let r_frac, g_frac, b_frac;

    if (s_frac === 0) {
        // Achromatic (grayscale)
        r_frac = l_frac;
        g_frac = l_frac;
        b_frac = l_frac;
    } else {
        // Chromatic (color)
        const q = (l_frac < 0.5) ? l_frac * (1 + s_frac) : l_frac + s_frac - l_frac * s_frac;
        const p = 2 * l_frac - q;

        r_frac = hueToRgb(p, q, h_frac + 1 / 3);
        g_frac = hueToRgb(p, q, h_frac);
        b_frac = hueToRgb(p, q, h_frac - 1 / 3);
    }

    // Convert fractions to 8-bit RGB values
    const r = Math.round(r_frac * 255);
    const g = Math.round(g_frac * 255);
    const b = Math.round(b_frac * 255);

    return [r, g, b];
}


// TODO: move this soon
// /**
//  * Generates a random color in HSL format with the given saturation and lightness, and returns it in hexadecimal format.
//  * 
//  * @param s - The saturation value (0 to 100).
//  * @param l - The lightness value (0 to 100).
//  * @returns A random color in hexadecimal format (e.g., "#RRGGBB").
//  */
// export function randHue(s: number, l: number): string {
//     // Generate a random hue value (0 to 359 degrees)
//     let h = randInt(0, 359);

//     // Convert HSL to RGB
//     let [r, g, b] = hslToRgb(h, s, l);

//     // Convert RGB to hexadecimal format
//     return rgbToHex(r, g, b);
// }
