/**
 * Returns a random number between min (inclusive) and max (exclusive):
 * [min,max)→R
 */
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}
