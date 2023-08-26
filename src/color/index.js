"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolateColor = exports.rgbToHex = exports.hexToRgb = void 0;
function hexToRgb(hexColor) {
    hexColor = hexColor.replace('#', '');
    return [
        parseInt(hexColor.substring(0, 2), 16),
        parseInt(hexColor.substring(2, 4), 16),
        parseInt(hexColor.substring(4, 6), 16)
    ];
}
exports.hexToRgb = hexToRgb;
function rgbToHex(r, g, b) {
    return "#".concat(r.toString(16).padStart(2, '0')).concat(g.toString(16).padStart(2, '0')).concat(b.toString(16).padStart(2, '0'));
}
exports.rgbToHex = rgbToHex;
/**
 * Interpolates between two colors based on a given factor.
 * @param color1 The starting color in hexadecimal format.
 * @param color2 The ending color in hexadecimal format.
 * @param t The interpolation factor between 0 and 1.
 * @returns The interpolated color in hexadecimal format.
 */
function interpolateColor(color1, color2, t) {
    // DEMO
    // >>> interpolateColor('#ff0000', '#0000ff', 0.0)
    // '#ff0000'
    // >>> interpolateColor('#ff0000', '#0000ff', 0.5)
    // '#800080'
    // >>> interpolateColor('#ff0000', '#0000ff', 1.0)
    // '#0000ff'
    var _a = hexToRgb(color1), r1 = _a[0], g1 = _a[1], b1 = _a[2];
    var _b = hexToRgb(color2), r2 = _b[0], g2 = _b[1], b2 = _b[2];
    var r = Math.round(r1 + (r2 - r1) * t);
    var g = Math.round(g1 + (g2 - g1) * t);
    var b = Math.round(b1 + (b2 - b1) * t);
    return rgbToHex(r, g, b);
}
exports.interpolateColor = interpolateColor;
