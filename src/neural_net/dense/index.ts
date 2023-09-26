// Reminder: this is the JavaScript translation (plus some modifications) of the `carbon` code.
// Read the code with full documentations at https://github.com/nvfp/carbon/blob/master/neuralnet

import { sigmoid, dotProduct } from "../../math/index.js";
import { randn } from "../../random/index.js";


/**
 * Represents a Dense Neural Network.
 */
export default class Dense {
    // private weights: number[][][];  // dev-docs: sometimes w&b values are needed
    // private biases: number[][][];
    public weights: number[][][];
    public biases: number[][][];
    private numLayers: number;

    /**
     * Initializes a new instance of the DenseNN class.
     * @param sizes - An array of layer sizes, where each element represents the number of neurons in that layer.
     */
    constructor(sizes: number[]) {
        this.weights = [];
        this.biases = [];

        for (let i = 0; i < sizes.length - 1; i++) {
            const n = sizes[i]; // Number of neurons at the current layer
            const m = sizes[i + 1]; // Number of neurons at the next layer

            // Weights
            const w: number[][] = [];
            for (let j = 0; j < m; j++) {
                const wRows: number[] = [];
                for (let k = 0; k < n; k++) {
                    const v =
                        -Math.sqrt(6 / (n + m)) +
                        Math.random() * 2 * Math.sqrt(6 / (n + m)); // Normalized Xavier
                    wRows.push(v);
                }
                w.push(wRows);
            }
            this.weights.push(w);

            // Biases
            const b: number[][] = [];
            for (let j = 0; j < m; j++) {
                b.push([randn()]);
            }
            this.biases.push(b);
        }

        this.numLayers = sizes.length;
    }

    /**
     * Performs a feedforward pass through the neural network.
     * @param a - The input data represented as an array of arrays, where each inner array contains a single value.
     * @returns The output of the feedforward pass.
     */
    feedforward(a: number[][]): number[][] {
        // Reminder: `a` should look like `[[v1], [v2], ...]`

        for (let i = 0; i < this.numLayers - 1; i++) {
            const w = this.weights[i];
            const b = this.biases[i];

            // Dot product
            const z = dotProduct(w, a);

            // Adding biases
            for (let j = 0; j < z.length; j++) {
                z[j][0] += b[j][0];
            }

            // Activation function
            a = [];
            for (let j = 0; j < z.length; j++) {
                a.push([sigmoid(z[j][0])]);
            }
        }

        return a;
    }
}
