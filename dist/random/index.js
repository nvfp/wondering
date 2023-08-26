"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randChoice = exports.randInt = exports.randFloat = void 0;
/**
 * Returns a random number (float) between min (inclusive) and max (exclusive):
 * [min,max)→R
 */
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randFloat = randFloat;
/**
 * Returns a random integer between min (inclusive) and max (inclusive):
 * [min,max]→Z
 */
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randInt = randInt;
/**
 * Returns a random element from the given array.
 * @param array The array from which to choose a random element.
 * @returns A randomly selected element from the array.
 */
function randChoice(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
exports.randChoice = randChoice;
