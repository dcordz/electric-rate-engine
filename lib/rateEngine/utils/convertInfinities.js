export default function convertInfinities(arr) {
    return arr.map((n) => n === 'Infinity' ? Infinity : n);
}
;
