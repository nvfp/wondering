// Note: this code is a translated and tweaked version of the Python one in the https://https://github.com/nvfp/mykit repo.

import Dense from "../dense/index.js";
import { randInt, randn, randChoice, randFloat } from "../../random/index.js";


/**
 * Represents a Genetic Neural Network.
 */
export default class Genetic {
    
    private sizes: number[];
    private numPopulations: number;
    private crossoverThreshold: number;
    private mutation1Rate: number;
    private mutation2Rate: number;
    private mutation2Range: [number, number];
    private numNew: number;
    
    // private population: Record<string, { nn: Dense; score: number }>;
    public population: Record<string, { nn: Dense; score: number }>;
    
    // private gen: number;
    public gen: number;
    private scoringFunc: (() => void) | null;
    private theParentIds: string[] | null;
    private prev: Record<string, { nn: Dense; score: number }>;

    /**
     * Initializes a new instance of the GeneticNN class.
     * @param sizes - The size of the dense neural network for each individual.
     * @param numPopulations - Number of individuals per generation.
     * @param crossoverThreshold - Determines how weights/biases from parent1 and parent2 are
     *                            combined during crossover. If the difference between parent1
     *                            and parent2 is less than this threshold, the child's value
     *                            is the average; otherwise, it's randomly selected from
     *                            either parent1 or parent2.
     * @param mutation1Rate - The probability of mutating a weight or bias (parent1/parent2 are close). Range: 0-1.
     * @param mutation2Rate - The probability of mutating a weight or bias (parent1/parent2 are different). Range: 0-1.
     * @param mutation2Range - The range of mutation change. For example, if set to [0.001, 0.1],
     *                         the weight or bias can be offset by a random value between 0.001
     *                         and 0.1, or between -0.001 and -0.1.
     * @param numNew - Number of new individuals (neither parent nor child) for each subsequent generation,
     *                with the constraint `numNew < numPopulations-3`.
     */
    constructor(
        sizes: number[],
        numPopulations: number = 10,
        crossoverThreshold: number = 0.001,
        mutation1Rate: number = 0.85,
        mutation2Rate: number = 0.99,
        mutation2Range: [number, number] = [0.1, 2.5],
        numNew: number = 0
    ) {

        this.sizes = sizes;
        this.numPopulations = numPopulations;
        this.crossoverThreshold = crossoverThreshold;
        this.mutation1Rate = mutation1Rate;
        this.mutation2Rate = mutation2Rate;
        this.mutation2Range = mutation2Range;
        this.numNew = numNew;

        this.population = {};
        for (let i = 0; i < numPopulations; i++) {
            const nn = new Dense(sizes);
            this.addIndividual(nn, 0);
        }

        // Runtime
        this.gen = 1; // The generation number, starting from 1 for the first generation, 2 for the second, and so on
        this.scoringFunc = null; // Scoring function
        this.theParentIds = null; // To store the parent that produced the current generation (after executing `keepElites()`)
        this.prev = {}; // To store the previous generation
    }

    private addIndividual(nn: Dense, score: number): void {
        let id = randInt(0, 10000);
        while (id in this.population) {
            id = randInt(0, 10000);
        }

        this.population[id] = {
            'nn': nn,
            'score': score
        };
    }

    getIdByRank(rank: number): string | null {
        // Note: rank=0 -> fittest, rank=1 -> 2nd fittest, and so on.

        // Convert the dictionary into an array of entries
        const entries = Object.entries(this.population);

        // Sort the entries based on the 'score' value in descending order
        entries.sort(function(a, b) {
            return b[1].score - a[1].score;
        });

        if (rank >= 0 && rank < entries.length) {
            return entries[rank][0];
        }
        return null;
    }

    setScore(id: string, score: number): void {
        if (this.population[id]) {
            this.population[id].score = score;
        }
    }

    private getAvgScore(): number {
        const scores = Object.values(this.population).map(item => item.score);
        const sum = scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const average = sum / scores.length;
        return average;
    }

    setScoringFunc(fn: () => void): void {
        this.scoringFunc = fn;
    }

    private scoring(): void {
        if (this.scoringFunc) {
            this.scoringFunc();
        }
    }

    private keepElites(): void {

        // Handle the first generation case
        if (this.theParentIds === null) {
            const parent1Id = this.getIdByRank(0);
            const parent2Id = this.getIdByRank(1);
    
            this.theParentIds = [parent1Id, parent2Id];
            this.prev = { ...this.population };

        } else {

            // Picking the fitter parent
            for (const id of this.theParentIds) {

                const oldScore = this.prev[id].score;
                const newScore = this.population[id].score;
    
                if (newScore >= oldScore) {
                    delete this.prev[id];
                } else {
                    delete this.population[id];
                }
            }
    
            // Combine
            const combined = { ...this.population, ...this.prev };
    
            // Sort
            const sortedEntries = Object.entries(combined).sort((a, b) => b[1].score - a[1].score);
    
            // Pick the fittest (pick the top `this.numPopulations`)
            const fittest: Record<string, { nn: Dense; score: number }> = {};
            // const sortedKeys = sortedEntries.map(([key]) => key).slice(0, this.numPopulations);  // i'm not sure with this way
            const sortedKeys = Object.keys(sortedEntries).slice(0, this.numPopulations);
            for (const key of sortedKeys) {
                fittest[key] = sortedEntries[key];
            }
    
            // Set to current population
            this.population = fittest;
    

            const parent1Id = this.getIdByRank(0);
            const parent2Id = this.getIdByRank(1);
    
            this.theParentIds = [parent1Id, parent2Id];
            this.prev = { ...this.population };
        }
    }

    nextGen(): void {

        this.gen += 1;
        this.scoring();
        this.keepElites();
    
        // Getting the best two parents with the highest scores
        const parent1Id = this.getIdByRank(0);
        const parent2Id = this.getIdByRank(1);
        const parent1 = this.population[parent1Id].nn;
        const parent2 = this.population[parent2Id].nn;

        // console.log(`DEBUG:  AVG (${this.getAvgScore()})  BEST: gen ${this.gen}  id ${parent1Id}  score ${this.population[parent1Id].score}`)
    
        // Reset + keep the parents
        this.population = {};
        this.population[parent1Id] = {
            'nn': parent1,
            'score': 0
        };
        this.population[parent2Id] = {
            'nn': parent2,
            'score': 0
        };
    
        // Reproduce
        for (let i = 0; i < (this.numPopulations - 2 - this.numNew); i++) {

            const child = new Dense(this.sizes);
    
            // Weights
            for (let l = 0; l < this.sizes.length; l++) {  // Iterate through each layer
                for (let c = 0; c < this.sizes[l]; c++) {  // Iterate through each neuron in the current layer
                    
                    if (l !== (this.sizes.length - 1)) {

                        for (let s = 0; s < this.sizes[l + 1]; s++) {  // Iterate through each neuron in the subsequent layer

                            const w1 = parent1.weights[l][s][c];
                            const w2 = parent2.weights[l][s][c];

                            let w: number;
    
                            // Crossover
                            if (Math.abs(w2 - w1) < this.crossoverThreshold) {
                                w = (w1 + w2) / 2;
    
                                // Mutation-1
                                if (Math.random() < this.mutation1Rate) {
                                    w = randn();
                                }
                            } else {
                                w = randChoice([w1, w2]);
    
                                // Mutation-2
                                if (Math.random() < this.mutation2Rate) {
                                    w += randFloat(...this.mutation2Range) * randChoice([-1, 1]);
                                    if (Math.abs(w) > 5) {  // to stop the value from getting too big
                                        w = randn();
                                    }
                                }
                            }
                            child.weights[l][s][c] = w;
                        }
                    }
                }
            }
    
            // Biases
            for (let j = 0; j < (this.sizes.length - 1); j++) {  // reminder: the input layer does not have biases
                for (let k = 0; k < this.sizes[j + 1]; k++) {
                    
                    const b1 = parent1.biases[j][k][0];
                    const b2 = parent2.biases[j][k][0];
                    
                    let b: number;
    
                    // Crossover
                    if (Math.abs(b2 - b1) < this.crossoverThreshold) {
                        b = (b1 + b2) / 2;
    
                        // Mutation-1
                        if (Math.random() < this.mutation1Rate) {
                            b = randn();
                        }
                    } else {
                        b = randChoice([b1, b2]);
    
                        // Mutation-2
                        if (Math.random() < this.mutation2Rate) {
                            b += randFloat(...this.mutation2Range) * randChoice([-1, 1]);
                            if (Math.abs(b) > 5) {
                                b = randn();
                            }
                        }
                    }
                    child.biases[j][k][0] = b;
                }
            }
    
            // Add to the population
            this.addIndividual(child, 0);
        }
    
        for (let i = 0; i < this.numNew; i++) {
            const nn = new Dense(this.sizes);
            this.addIndividual(nn, 0);
        }
    }    
}
