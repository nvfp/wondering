"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('greet function', () => {
    it('should return a greeting message with the provided name', () => {
        const result = (0, index_1.greet)('Alice');
        expect(result).toBe('Hello, Alice!');
    });
});
