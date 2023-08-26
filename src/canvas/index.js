"use strict";
// import { hexToRgb } from "../color";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawBloomCircle = exports.drawGradLine = void 0;
var colorModule = require("../color");
var hexToRgb = colorModule.hexToRgb;
/**
 * Draws a gradient line on the provided canvas context.
 * @param ctx The canvas 2D rendering context.
 * @param x1 The x-coordinate of the starting point.
 * @param y1 The y-coordinate of the starting point.
 * @param x2 The x-coordinate of the ending point.
 * @param y2 The y-coordinate of the ending point.
 * @param color1 The starting color of the gradient.
 * @param color2 The ending color of the gradient.
 * @param width The width of the line.
 */
function drawGradLine(ctx, x1, y1, x2, y2, color1, color2, width) {
    var gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = width;
    ctx.stroke();
}
exports.drawGradLine = drawGradLine;
/**
 * Draws a bloom circle on the provided canvas context.
 * @param ctx The canvas 2D rendering context.
 * @param x The x-coordinate of the center of the circle.
 * @param y The y-coordinate of the center of the circle.
 * @param r The radius of the circle.
 * @param bloomColor The color of the bloom.
 * @param color The color of the solid circle (if null, only bloom will be drawn).
 * @param bdColor The border color of the solid circle.
 * @param bdWidth The border width of the solid circle.
 * @param numLayers The number of layers for bloom effect (set to 0 to skip bloom).
 * @param maxOpacity The maximum opacity of the bloom layers.
 * @param fuzziness The increment in radius for each bloom layer.
 */
function drawBloomCircle(ctx, x, y, r, bloomColor, color, bdColor, bdWidth, numLayers, maxOpacity, fuzziness) {
    // when `color = null`, only bloom will be drawn
    // set `numLayers = 0` so it doesn't draw the bloom
    if (r === void 0) { r = 3; }
    if (bloomColor === void 0) { bloomColor = '#aaaaaa'; }
    if (color === void 0) { color = null; }
    if (bdColor === void 0) { bdColor = '#ff0000'; }
    if (bdWidth === void 0) { bdWidth = 2; }
    if (numLayers === void 0) { numLayers = 5; }
    if (maxOpacity === void 0) { maxOpacity = 0.2; }
    if (fuzziness === void 0) { fuzziness = 2; }
    var _a = hexToRgb(bloomColor), bloomR = _a[0], bloomG = _a[1], bloomB = _a[2];
    var baseRadius = r;
    if (numLayers > 0) {
        for (var i = 0; i < numLayers; i++) {
            var radius = baseRadius + i * fuzziness;
            var opacity = (1 - i / numLayers) * maxOpacity;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(".concat(bloomR, ", ").concat(bloomG, ", ").concat(bloomB, ", ").concat(opacity, ")");
            ctx.fill();
            ctx.closePath();
        }
    }
    if (color !== null) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        if (bdWidth !== 0) {
            ctx.strokeStyle = bdColor;
            ctx.lineWidth = bdWidth;
            ctx.stroke();
        }
        ctx.closePath();
    }
}
exports.drawBloomCircle = drawBloomCircle;
