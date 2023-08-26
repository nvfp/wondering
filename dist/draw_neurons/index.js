"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawNeurons = void 0;
const random_1 = require("../random");
const canvas_1 = require("../canvas");
const color_1 = require("../color");
function drawNeurons(canvas, xgap = 100, ygap = 100, xgap_off = 45, ygap_off = 45, neuron_prob = 0.55, string_prob = 0.35, background = '#000000', color1 = '#2e5e7e', color2 = '#d84545') {
    // To prevent overlap between neighboring neurons, the gap must be greater than twice the offset.
    // example: if xgap_off = randInt(45, 55) -> the max offset is 110, so the lower bound of the xgap should be > 110 (like randInt(120, 160))
    const ctx = canvas.getContext('2d');
    // set the top left to make the neurons cover entire canvas
    const TL_X = -50;
    const TL_Y = -50;
    // manually calculate the number of horizontal and vertical neuron grids to make sure entire canvas is covered
    const NX = Math.ceil((canvas.width - TL_X * 2 + xgap_off * 2) / xgap);
    const NY = Math.ceil((canvas.height - TL_Y * 2 + ygap_off * 2) / ygap);
    let neurons = [];
    // clear the canvas
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let prevLayerNeurons = [];
    for (var x = 0; x < NX; x++) {
        let currentLayerNeurons = [];
        for (var y = 0; y < NY; y++) {
            if (Math.random() < neuron_prob) {
                let X = TL_X + x * xgap + (0, random_1.randInt)(-xgap_off, xgap_off);
                let Y = TL_Y + y * ygap + (0, random_1.randInt)(-ygap_off, ygap_off);
                let R = (0, random_1.randInt)(2, 11);
                let _ALPHA = (0, random_1.randFloat)(0.05, 1);
                let COLOR = (0, random_1.randChoice)([
                    (0, color_1.interpolateColor)(background, color1, _ALPHA),
                    (0, color_1.interpolateColor)(background, color2, _ALPHA)
                ]);
                neurons.push([X, Y, R, COLOR, _ALPHA]);
                currentLayerNeurons.push([X, Y, COLOR]);
                if (x > 0) {
                    prevLayerNeurons.forEach(neuron => {
                        if (neuron !== null) {
                            if (Math.random() < string_prob) {
                                let [X2, Y2, COLOR_PREV] = neuron;
                                // using the neuron's color
                                let [R1, G1, B1] = (0, color_1.hexToRgb)(COLOR);
                                let [R2, G2, B2] = (0, color_1.hexToRgb)(COLOR_PREV);
                                let c1 = `rgba(${R1}, ${G1}, ${B1}, ${(0, random_1.randFloat)(0.15, 0.85)})`;
                                let c2 = `rgba(${R2}, ${G2}, ${B2}, ${(0, random_1.randFloat)(0.15, 0.85)})`;
                                (0, canvas_1.drawGradLine)(ctx, X, Y, X2, Y2, c1, c2, 1);
                            }
                        }
                    });
                }
            }
            else {
                // no neuron
                currentLayerNeurons.push(null);
            }
        }
        prevLayerNeurons = currentLayerNeurons;
    }
    neurons.forEach(neuron => {
        let [x, y, r, color, alpha] = neuron;
        let bdColor = (0, color_1.interpolateColor)('#000000', '#ffffff', alpha);
        let l = (0, random_1.randFloat)(0, 0.10); // low prob
        let h = (0, random_1.randFloat)(0, 0.55); // high prob
        let p = (0, random_1.randChoice)([l, l, l, l, l, l, l, l, h]);
        let bloomColor = (0, color_1.interpolateColor)(color, '#ffffff', p);
        let l2 = (0, random_1.randInt)(3, 5); // low prob
        let h2 = (0, random_1.randInt)(3, 25); // high prob
        let numLayers = (0, random_1.randChoice)([l2, l2, l2, l2, l2, l2, l2, l2, l2, h2]);
        let maxOpacity = (0, random_1.randFloat)(0.07, 0.23);
        let fuzziness = (0, random_1.randInt)(2, 11);
        (0, canvas_1.drawBloomCircle)(ctx, x, y, r, bloomColor, color, bdColor, 2, numLayers, maxOpacity, fuzziness);
    });
}
exports.drawNeurons = drawNeurons;
