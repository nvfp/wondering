"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('hexToRgb', () => {
    it('converts hex color to RGB', () => {
        const result = (0, _1.hexToRgb)('#000000');
        const expected = [0, 0, 0];
        expect(result).toEqual(expected);
    });
    it('converts hex color to RGB', () => {
        const result = (0, _1.hexToRgb)('#ffffff');
        const expected = [255, 255, 255];
        expect(result).toEqual(expected);
    });
    it('converts hex color to RGB', () => {
        const result = (0, _1.hexToRgb)('#ff0000');
        const expected = [255, 0, 0];
        expect(result).toEqual(expected);
    });
    it('converts hex color to RGB', () => {
        const result = (0, _1.hexToRgb)('#123456');
        const expected = [18, 52, 86];
        expect(result).toEqual(expected);
    });
});
describe('rgbToHex', () => {
    it('converts RGB values to hex color', () => {
        const result = (0, _1.rgbToHex)(0, 0, 0);
        const expected = '#000000';
        expect(result).toEqual(expected);
    });
    it('converts RGB values to hex color', () => {
        const result = (0, _1.rgbToHex)(255, 255, 255);
        const expected = '#ffffff';
        expect(result).toEqual(expected);
    });
    it('converts RGB values to hex color', () => {
        const result = (0, _1.rgbToHex)(255, 0, 0);
        const expected = '#ff0000';
        expect(result).toEqual(expected);
    });
    it('converts RGB values to hex color', () => {
        const result = (0, _1.rgbToHex)(18, 52, 86);
        const expected = '#123456';
        expect(result).toEqual(expected);
    });
});
describe('interpolateColor', () => {
    it('interpolates between two colors based on the given factor', () => {
        const color1 = '#ff0000'; // Red
        const color2 = '#0000ff'; // Blue
        const tValues = [0.0, 0.5, 1.0];
        const expectedColors = ['#ff0000', '#800080', '#0000ff'];
        tValues.forEach((t, index) => {
            const result = (0, _1.interpolateColor)(color1, color2, t);
            expect(result).toEqual(expectedColors[index]);
        });
    });
});
