import { hexToRgb } from "../color/index.js";


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
export function drawGradLine(
    ctx: CanvasRenderingContext2D,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color1: string,
    color2: string,
    width: number
): void {

    let gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = width;

    ctx.stroke();
}


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
export function drawBloomCircle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    r: number = 3,
    bloomColor: string = '#aaaaaa',
    color: string | null = null,
    bdColor: string = '#ff0000',
    bdWidth: number = 2,
    numLayers: number = 5,
    maxOpacity: number = 0.2,
    fuzziness: number = 2
): void {
    // when `color = null`, only bloom will be drawn
    // set `numLayers = 0` so it doesn't draw the bloom

    const [bloomR, bloomG, bloomB] = hexToRgb(bloomColor);

    const baseRadius = r;

    if (numLayers > 0) {
        for (let i = 0; i < numLayers; i++) {
            const radius = baseRadius + i * fuzziness;
            const opacity = (1 - i / numLayers) * maxOpacity;

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = `rgba(${bloomR}, ${bloomG}, ${bloomB}, ${opacity})`;
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
