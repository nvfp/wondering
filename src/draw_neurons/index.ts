// import { randFloat, randInt, randChoice } from "../random";
// import { drawGradLine, drawBloomCircle } from "../canvas";
// import { interpolateColor, hexToRgb } from "../color";

const randomModule = require("../random");
const randInt = randomModule.randInt;
const randFloat = randomModule.randFloat;
const randChoice = randomModule.randChoice;

const canvasModule = require("../canvas");
const drawGradLine = canvasModule.drawGradLine;
const drawBloomCircle = canvasModule.drawBloomCircle;

const colorsModule = require("../color");
const interpolateColor = colorsModule.interpolateColor;
const hexToRgb = colorsModule.hexToRgb;


export function drawNeurons(
    canvas: HTMLCanvasElement,
    xgap: number = 100,
    ygap: number = 100,
    xgap_off: number = 45,
    ygap_off: number = 45,
    neuron_prob: number = 0.55,
    string_prob: number = 0.35,
    background: string = '#000000',
    color1: string = '#2e5e7e',
    color2: string = '#d84545',
) {
    // To prevent overlap between neighboring neurons, the gap must be greater than twice the offset.
    // example: if xgap_off = randInt(45, 55) -> the max offset is 110, so the lower bound of the xgap should be > 110 (like randInt(120, 160))

    const ctx = canvas.getContext('2d');

    // set the top left to make the neurons cover entire canvas
    const TL_X = -50
    const TL_Y = -50

    // manually calculate the number of horizontal and vertical neuron grids to make sure entire canvas is covered
    const NX = Math.ceil((canvas.width  - TL_X*2 + xgap_off*2)/xgap)
    const NY = Math.ceil((canvas.height - TL_Y*2 + ygap_off*2)/ygap)

    let neurons = []

    // clear the canvas
    ctx.fillStyle = background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let prevLayerNeurons = []
    
    for (var x = 0; x < NX; x++) {

        let currentLayerNeurons = []

        for (var y = 0; y < NY; y++) {

            if (Math.random() < neuron_prob) {

                let X = TL_X + x*xgap + randInt(-xgap_off, xgap_off)
                let Y = TL_Y + y*ygap + randInt(-ygap_off, ygap_off)
                let R = randInt(2, 11)
                let _ALPHA = randFloat(0.05, 1)
                let COLOR = randChoice([
                    interpolateColor(background, color1, _ALPHA),
                    interpolateColor(background, color2, _ALPHA)
                ])
                
                neurons.push([X, Y, R, COLOR, _ALPHA])

                currentLayerNeurons.push([X, Y, COLOR])

                if (x > 0) {
                    prevLayerNeurons.forEach(neuron => {
                        if (neuron !== null) {
                            if (Math.random() < string_prob) {
                                let [X2, Y2, COLOR_PREV] = neuron

                                // using the neuron's color
                                let [R1, G1, B1] = hexToRgb(COLOR)
                                let [R2, G2, B2] = hexToRgb(COLOR_PREV)

                                let c1 = `rgba(${R1}, ${G1}, ${B1}, ${randFloat(0.15, 0.85)})`
                                let c2 = `rgba(${R2}, ${G2}, ${B2}, ${randFloat(0.15, 0.85)})`
                                drawGradLine(ctx, X, Y, X2, Y2, c1, c2, 1)
                            }
                        }
                    })
                }
            } else {
                // no neuron
                currentLayerNeurons.push(null)
            }
        }
        prevLayerNeurons = currentLayerNeurons
    }

    neurons.forEach(neuron => {

        let [x, y, r, color, alpha] = neuron

        let bdColor = interpolateColor('#000000', '#ffffff', alpha)

        let l = randFloat(0, 0.10)  // low prob
        let h = randFloat(0, 0.55)  // high prob
        let p = randChoice([l, l, l, l, l, l, l, l, h])
        let bloomColor = interpolateColor(color, '#ffffff', p)

        let l2 = randInt(3, 5)  // low prob
        let h2 = randInt(3, 25)  // high prob
        let numLayers = randChoice([l2, l2, l2, l2, l2, l2, l2, l2, l2, h2])

        let maxOpacity = randFloat(0.07, 0.23)
        let fuzziness = randInt(2, 11)
        
        drawBloomCircle(ctx, x, y, r, bloomColor, color, bdColor, 2, numLayers, maxOpacity, fuzziness)
    })
}