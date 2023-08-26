"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe('hexToRgb', function () {
    it('converts hex color to RGB', function () {
        var result = (0, _1.hexToRgb)('#000000');
        var expected = [0, 0, 0];
        expect(result).toEqual(expected);
    });
    it('converts hex color to RGB', function () {
        var result = (0, _1.hexToRgb)('#ffffff');
        var expected = [255, 255, 255];
        expect(result).toEqual(expected);
    });
    it('converts hex color to RGB', function () {
        var result = (0, _1.hexToRgb)('#ff0000');
        var expected = [255, 0, 0];
        expect(result).toEqual(expected);
    });
    it('converts hex color to RGB', function () {
        var result = (0, _1.hexToRgb)('#123456');
        var expected = [18, 52, 86];
        expect(result).toEqual(expected);
    });
});
describe('rgbToHex', function () {
    it('converts RGB values to hex color', function () {
        var result = (0, _1.rgbToHex)(0, 0, 0);
        var expected = '#000000';
        expect(result).toEqual(expected);
    });
    it('converts RGB values to hex color', function () {
        var result = (0, _1.rgbToHex)(255, 255, 255);
        var expected = '#ffffff';
        expect(result).toEqual(expected);
    });
    it('converts RGB values to hex color', function () {
        var result = (0, _1.rgbToHex)(255, 0, 0);
        var expected = '#ff0000';
        expect(result).toEqual(expected);
    });
    it('converts RGB values to hex color', function () {
        var result = (0, _1.rgbToHex)(18, 52, 86);
        var expected = '#123456';
        expect(result).toEqual(expected);
    });
});
describe('interpolateColor', function () {
    it('interpolates between two colors based on the given factor', function () {
        var color1 = '#ff0000'; // Red
        var color2 = '#0000ff'; // Blue
        var tValues = [0.0, 0.5, 1.0];
        var expectedColors = ['#ff0000', '#800080', '#0000ff'];
        tValues.forEach(function (t, index) {
            var result = (0, _1.interpolateColor)(color1, color2, t);
            expect(result).toEqual(expectedColors[index]);
        });
    });
});
