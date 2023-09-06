

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

