"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe('randFloat', function () {
    it('generates numbers within the specified range', function () {
        var min = 0;
        var max = 10;
        var iterations = 1000; // Number of test iterations
        for (var i = 0; i < iterations; i++) {
            var result = (0, _1.randFloat)(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThan(max);
        }
    });
});
describe('randInt', function () {
    it('generates integers within the specified range', function () {
        var min = 5;
        var max = 15;
        var iterations = 1000; // Number of test iterations
        for (var i = 0; i < iterations; i++) {
            var result = (0, _1.randInt)(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        }
    });
});
describe('randChoice', function () {
    it('selects a random element from the array', function () {
        var array = [1, 2, 3, 4, 5];
        var iterations = 1000; // Number of test iterations
        for (var i = 0; i < iterations; i++) {
            var result = (0, _1.randChoice)(array);
            expect(array).toContain(result);
        }
    });
});
