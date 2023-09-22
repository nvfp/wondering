

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


// Below inferno (with some tweaks) ref: https://github.com/d3/d3-scale-chromatic/blob/main/src/sequential-multi/viridis.js

export const INFERNO_COLORS: string[] = [
    '#000004', '#010005', '#010106', '#010108', '#02010a', '#02020c', '#02020e', '#030210',
    '#040312', '#040314', '#050417', '#060419', '#07051b', '#08051d', '#09061f', '#0a0722',
    '#0b0724', '#0c0826', '#0d0829', '#0e092b', '#10092d', '#110a30', '#120a32', '#140b34',
    '#150b37', '#160b39', '#180c3c', '#190c3e', '#1b0c41', '#1c0c43', '#1e0c45', '#1f0c48',
    '#210c4a', '#230c4c', '#240c4f', '#260c51', '#280b53', '#290b55', '#2b0b57', '#2d0b59',
    '#2f0a5b', '#310a5c', '#320a5e', '#340a5f', '#360961', '#380962', '#390963', '#3b0964',
    '#3d0965', '#3e0966', '#400a67', '#420a68', '#440a68', '#450a69', '#470b6a', '#490b6a',
    '#4a0c6b', '#4c0c6b', '#4d0d6c', '#4f0d6c', '#510e6c', '#520e6d', '#540f6d', '#550f6d',
    '#57106e', '#59106e', '#5a116e', '#5c126e', '#5d126e', '#5f136e', '#61136e', '#62146e',
    '#64156e', '#65156e', '#67166e', '#69166e', '#6a176e', '#6c186e', '#6d186e', '#6f196e',
    '#71196e', '#721a6e', '#741a6e', '#751b6e', '#771c6d', '#781c6d', '#7a1d6d', '#7c1d6d',
    '#7d1e6d', '#7f1e6c', '#801f6c', '#82206c', '#84206b', '#85216b', '#87216b', '#88226a',
    '#8a226a', '#8c2369', '#8d2369', '#8f2469', '#902568', '#922568', '#932667', '#952667',
    '#972766', '#982766', '#9a2865', '#9b2964', '#9d2964', '#9f2a63', '#a02a63', '#a22b62',
    '#a32c61', '#a52c60', '#a62d60', '#a82e5f', '#a92e5e', '#ab2f5e', '#ad305d', '#ae305c',
    '#b0315b', '#b1325a', '#b3325a', '#b43359', '#b63458', '#b73557', '#b93556', '#ba3655',
    '#bc3754', '#bd3853', '#bf3952', '#c03a51', '#c13a50', '#c33b4f', '#c43c4e', '#c63d4d',
    '#c73e4c', '#c83f4b', '#ca404a', '#cb4149', '#cc4248', '#ce4347', '#cf4446', '#d04545',
    '#d24644', '#d34743', '#d44842', '#d54a41', '#d74b3f', '#d84c3e', '#d94d3d', '#da4e3c',
    '#db503b', '#dd513a', '#de5238', '#df5337', '#e05536', '#e15635', '#e25734', '#e35933',
    '#e45a31', '#e55c30', '#e65d2f', '#e75e2e', '#e8602d', '#e9612b', '#ea632a', '#eb6429',
    '#eb6628', '#ec6726', '#ed6925', '#ee6a24', '#ef6c23', '#ef6e21', '#f06f20', '#f1711f',
    '#f1731d', '#f2741c', '#f3761b', '#f37819', '#f47918', '#f57b17', '#f57d15', '#f67e14',
    '#f68013', '#f78212', '#f78410', '#f8850f', '#f8870e', '#f8890c', '#f98b0b', '#f98c0a',
    '#f98e09', '#fa9008', '#fa9207', '#fa9407', '#fb9606', '#fb9706', '#fb9906', '#fb9b06',
    '#fb9d07', '#fc9f07', '#fca108', '#fca309', '#fca50a', '#fca60c', '#fca80d', '#fcaa0f',
    '#fcac11', '#fcae12', '#fcb014', '#fcb216', '#fcb418', '#fbb61a', '#fbb81d', '#fbba1f',
    '#fbbc21', '#fbbe23', '#fac026', '#fac228', '#fac42a', '#fac62d', '#f9c72f', '#f9c932',
    '#f9cb35', '#f8cd37', '#f8cf3a', '#f7d13d', '#f7d340', '#f6d543', '#f6d746', '#f5d949',
    '#f5db4c', '#f4dd4f', '#f4df53', '#f4e156', '#f3e35a', '#f3e55d', '#f2e661', '#f2e865',
    '#f2ea69', '#f1ec6d', '#f1ed71', '#f1ef75', '#f1f179', '#f2f27d', '#f2f482', '#f3f586',
    '#f3f68a', '#f4f88e', '#f5f992', '#f6fa96', '#f8fb9a', '#f9fc9d', '#fafda1', '#fcffa4'
];

export const INFERNO_COLORS_LEN: number = INFERNO_COLORS.length;

/**
 * Return the Inferno color palette.
 * @param t A number in the interval [0,1].
 * @returns The color at the specified position in the palette, where
 *   0 corresponds to the darkest color (dark violet), and 1 corresponds
 *   to the brightest color (super light yellow, almost white).
 */
export function infernoColor(t: number): string {
    return INFERNO_COLORS[Math.max(0, Math.min(INFERNO_COLORS_LEN - 1, Math.floor(t * INFERNO_COLORS_LEN)))];
}
