


/**
 * RunningAverages class calculates the average without storing each individual value.
 */
class RunningAverages {
    private count: number;
    private average: number;
    private min: number;
    private max: number;

    constructor() {
        this.count = 0;
        this.average = 0;

        // Extra features
        this.min = 10000000;
        this.max = -10000000;
    }

    /**
     * Adds a sample to the running average calculation.
     * @param sample - The sample value to add.
     */
    add(sample: number): void {
        this.count += 1;
        this.average = this.average + (sample - this.average) / this.count;

        if (sample < this.min) {
            this.min = sample;
        }
        if (sample > this.max) {
            this.max = sample;
        }
    }

    /**
     * @returns The current running average.
     */
    avg(): number {
        return this.average;
    }

    /**
     * @returns The range (difference between max and min values) of the samples added
     */
    range(): number {
        return this.max - this.min;
    }

    /**
     * Resets the RunningAverages instance to its initial state.
     */
    reset(): void {
        this.count = 0;
        this.average = 0;

        this.min = 10000000;
        this.max = -10000000;
    }
}


/**
 * Calculates the dot product of two matrices.
 *
 * @param {number[][]} m1 - The first matrix.
 * @param {number[][]} m2 - The second matrix.
 * @returns {number[][]} The result of the dot product as a new matrix.
 */
function dotProduct(m1: number[][], m2: number[][]): number[][] {
    const rows1 = m1.length;
    const cols1 = m1[0].length;
    const cols2 = m2[0].length;

    const result: number[][] = new Array(rows1);

    for (let i = 0; i < rows1; i++) {
        result[i] = new Array(cols2);
        for (let j = 0; j < cols2; j++) {
            let sum = 0;
            for (let k = 0; k < cols1; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }

    return result;
}


/**
 * Calculate the sigmoid function for a given input.
 *
 * @param {number} x - The input value.
 * @returns {number} - The result of the sigmoid function.
 */
function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
}


/**
 * Maps a value from one range to another.
 *
 * @param {number} value - The value to be mapped.
 * @param {number} fromMin - The minimum value of the source range.
 * @param {number} fromMax - The maximum value of the source range.
 * @param {number} toMin - The minimum value of the target range.
 * @param {number} toMax - The maximum value of the target range.
 * @returns {number} The mapped value.
 */
function mapRange(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number): number {
    // Normalize the value from the original range
    const normalizedValue = (value - fromMin) / (fromMax - fromMin);

    // Scale the normalized value to the target range
    const mappedValue = normalizedValue * (toMax - toMin) + toMin;

    return mappedValue;
}
