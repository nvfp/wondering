"use strict";
// import { randFloat, randInt, randChoice } from "../random";
// import { drawGradLine, drawBloomCircle } from "../canvas";
// import { interpolateColor, hexToRgb } from "../color";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawNeurons = void 0;
var randomModule = require("../random");
var randInt = randomModule.randInt;
var randFloat = randomModule.randFloat;
var randChoice = randomModule.randChoice;
var canvasModule = require("../canvas");
var drawGradLine = canvasModule.drawGradLine;
var drawBloomCircle = canvasModule.drawBloomCircle;
var colorsModule = require("../color");
var interpolateColor = colorsModule.interpolateColor;
var hexToRgb = colorsModule.hexToRgb;
function drawNeurons(canvas, xgap, ygap, xgap_off, ygap_off, neuron_prob, string_prob, background, color1, color2) {
    // To prevent overlap between neighboring neurons, the gap must be greater than twice the offset.
    // example: if xgap_off = randInt(45, 55) -> the max offset is 110, so the lower bound of the xgap should be > 110 (like randInt(120, 160))
    if (xgap === void 0) { xgap = 100; }
    if (ygap === void 0) { ygap = 100; }
    if (xgap_off === void 0) { xgap_off = 45; }
    if (ygap_off === void 0) { ygap_off = 45; }
    if (neuron_prob === void 0) { neuron_prob = 0.55; }
    if (string_prob === void 0) { string_prob = 0.35; }
    if (background === void 0) { background = '#000000'; }
    if (color1 === void 0) { color1 = '#2e5e7e'; }
    if (color2 === void 0) { color2 = '#d84545'; }
    var ctx = canvas.getContext('2d');
    // set the top left to make the neurons cover entire canvas
    var TL_X = -50;
    var TL_Y = -50;
    // manually calculate the number of horizontal and vertical neuron grids to make sure entire canvas is covered
    var NX = Math.ceil((canvas.width - TL_X * 2 + xgap_off * 2) / xgap);
    var NY = Math.ceil((canvas.height - TL_Y * 2 + ygap_off * 2) / ygap);
    var neurons = [];
    // clear the canvas
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    var prevLayerNeurons = [];
    for (var x = 0; x < NX; x++) {
        var currentLayerNeurons = [];
        var _loop_1 = function () {
            if (Math.random() < neuron_prob) {
                var X_1 = TL_X + x * xgap + randInt(-xgap_off, xgap_off);
                var Y_1 = TL_Y + y * ygap + randInt(-ygap_off, ygap_off);
                var R = randInt(2, 11);
                var _ALPHA = randFloat(0.05, 1);
                var COLOR_1 = randChoice([
                    interpolateColor(background, color1, _ALPHA),
                    interpolateColor(background, color2, _ALPHA)
                ]);
                neurons.push([X_1, Y_1, R, COLOR_1, _ALPHA]);
                currentLayerNeurons.push([X_1, Y_1, COLOR_1]);
                if (x > 0) {
                    prevLayerNeurons.forEach(function (neuron) {
                        if (neuron !== null) {
                            if (Math.random() < string_prob) {
                                var X2 = neuron[0], Y2 = neuron[1], COLOR_PREV = neuron[2];
                                // using the neuron's color
                                var _a = hexToRgb(COLOR_1), R1 = _a[0], G1 = _a[1], B1 = _a[2];
                                var _b = hexToRgb(COLOR_PREV), R2 = _b[0], G2 = _b[1], B2 = _b[2];
                                var c1 = "rgba(".concat(R1, ", ").concat(G1, ", ").concat(B1, ", ").concat(randFloat(0.15, 0.85), ")");
                                var c2 = "rgba(".concat(R2, ", ").concat(G2, ", ").concat(B2, ", ").concat(randFloat(0.15, 0.85), ")");
                                drawGradLine(ctx, X_1, Y_1, X2, Y2, c1, c2, 1);
                            }
                        }
                    });
                }
            }
            else {
                // no neuron
                currentLayerNeurons.push(null);
            }
        };
        for (var y = 0; y < NY; y++) {
            _loop_1();
        }
        prevLayerNeurons = currentLayerNeurons;
    }
    neurons.forEach(function (neuron) {
        var x = neuron[0], y = neuron[1], r = neuron[2], color = neuron[3], alpha = neuron[4];
        var bdColor = interpolateColor('#000000', '#ffffff', alpha);
        var l = randFloat(0, 0.10); // low prob
        var h = randFloat(0, 0.55); // high prob
        var p = randChoice([l, l, l, l, l, l, l, l, h]);
        var bloomColor = interpolateColor(color, '#ffffff', p);
        var l2 = randInt(3, 5); // low prob
        var h2 = randInt(3, 25); // high prob
        var numLayers = randChoice([l2, l2, l2, l2, l2, l2, l2, l2, l2, h2]);
        var maxOpacity = randFloat(0.07, 0.23);
        var fuzziness = randInt(2, 11);
        drawBloomCircle(ctx, x, y, r, bloomColor, color, bdColor, 2, numLayers, maxOpacity, fuzziness);
    });
}
exports.drawNeurons = drawNeurons;
