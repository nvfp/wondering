

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
