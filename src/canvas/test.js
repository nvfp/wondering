"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
// TODO: improve the tests
describe('drawGradLine', function () {
    it('correctly configures canvas context and methods', function () {
        // Create a mock context for testing
        var mockGradient = {
            addColorStop: jest.fn(),
        };
        var mockContext = {
            createLinearGradient: jest.fn(function () { return mockGradient; }),
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            strokeStyle: '',
            lineWidth: 0,
            stroke: jest.fn(),
        };
        var x1 = 0;
        var y1 = 0;
        var x2 = 100;
        var y2 = 100;
        var color1 = '#ff0000';
        var color2 = '#0000ff';
        var width = 2;
        (0, _1.drawGradLine)(mockContext, x1, y1, x2, y2, color1, color2, width);
        // Assertions to test if methods were called correctly
        expect(mockContext.createLinearGradient).toHaveBeenCalledWith(x1, y1, x2, y2);
        expect(mockGradient.addColorStop).toHaveBeenCalledWith(0, color1);
        expect(mockGradient.addColorStop).toHaveBeenCalledWith(1, color2);
        expect(mockContext.beginPath).toHaveBeenCalled();
        expect(mockContext.moveTo).toHaveBeenCalledWith(x1, y1);
        expect(mockContext.lineTo).toHaveBeenCalledWith(x2, y2);
        expect(mockContext.strokeStyle).toBe(mockGradient);
        expect(mockContext.lineWidth).toBe(width);
        expect(mockContext.stroke).toHaveBeenCalled();
    });
});
// describe('drawBloomCircle', () => {
//     it('correctly draws bloom circles with provided parameters', () => {
//         // Create a mock context for testing
//         const mockContext: any = {
//             beginPath: jest.fn(),
//             arc: jest.fn(),
//             fillStyle: '',
//             fill: jest.fn(),
//             closePath: jest.fn(),
//             strokeStyle: '',
//             lineWidth: 0,
//             stroke: jest.fn(),
//         };
//         const x = 50;
//         const y = 50;
//         const r = 5;
//         const bloomColor = '#aaaaaa';
//         const color = '#ff0000';
//         const bdColor = '#00ff00';
//         const bdWidth = 2;
//         const numLayers = 3;
//         const maxOpacity = 0.3;
//         const fuzziness = 1;
//         drawBloomCircle(
//             mockContext,
//             x,
//             y,
//             r,
//             bloomColor,
//             color,
//             bdColor,
//             bdWidth,
//             numLayers,
//             maxOpacity,
//             fuzziness
//         );
//         // Assertions to test if methods were called correctly
//         expect(mockContext.beginPath).toHaveBeenCalledTimes(numLayers + 1);
//         expect(mockContext.arc).toHaveBeenCalledTimes(numLayers + 1);
//         // expect(mockContext.fillStyle).toBe(`rgba(170, 170, 170, 0.3)`); // Bloom color with opacity
//         expect(mockContext.fillStyle).toBe("#ff0000"); // Bloom color with opacity
//         expect(mockContext.fill).toHaveBeenCalledTimes(numLayers);
//         expect(mockContext.closePath).toHaveBeenCalledTimes(numLayers + 1);
//         expect(mockContext.arc).toHaveBeenCalledWith(x, y, r, 0, 2 * Math.PI);
//         expect(mockContext.fillStyle).toBe(color); // Actual circle color
//         expect(mockContext.fill).toHaveBeenCalledTimes(1);
//         expect(mockContext.strokeStyle).toBe(bdColor);
//         expect(mockContext.lineWidth).toBe(bdWidth);
//         expect(mockContext.stroke).toHaveBeenCalled();
//     });
// });
