// Identity
const is = x => typeof x === "number" && Number.isInteger(x);

// Arithmetic
const add = x => y => x + y;
const mul = x => y => x * y;
const div = x => y => x / y;
const sub = x => y => x - y;
const neg = x => -x;
const inv = x => 1 / x;

module.exports = { is, add, mul, div, sub, neg, inv };
