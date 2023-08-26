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
export declare function drawGradLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color1: string, color2: string, width: number): void;
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
export declare function drawBloomCircle(ctx: CanvasRenderingContext2D, x: number, y: number, r?: number, bloomColor?: string, color?: string | null, bdColor?: string, bdWidth?: number, numLayers?: number, maxOpacity?: number, fuzziness?: number): void;
