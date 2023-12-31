import { randFloat, randInt, randChoice } from '.';

describe('randFloat', () => {
    it('generates numbers within the specified range', () => {
        const min = 0;
        const max = 10;
        const iterations = 1000; // Number of test iterations

        for (let i = 0; i < iterations; i++) {
            const result = randFloat(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThan(max);
        }
    });
});

describe('randInt', () => {
    it('generates integers within the specified range', () => {
        const min = 5;
        const max = 15;
        const iterations = 1000; // Number of test iterations

        for (let i = 0; i < iterations; i++) {
            const result = randInt(min, max);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        }
    });
});

describe('randChoice', () => {
    it('selects a random element from the array', () => {
        const array = [1, 2, 3, 4, 5];
        const iterations = 1000; // Number of test iterations

        for (let i = 0; i < iterations; i++) {
            const result = randChoice(array);
            expect(array).toContain(result);
        }
    });
});