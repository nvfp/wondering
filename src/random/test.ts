import { greet } from './index';

describe('greet function', () => {
    it('should return a greeting message with the provided name', () => {
        const result = greet('Alice');
        expect(result).toBe('Hello, Alice!');
    });
});
