// Identity
export const is = x => typeof x === "number" && Number.isInteger(x);

// Arithmetic
export const add = x => y => x + y;
export const mul = x => y => x * y;
export const div = x => y => x / y;
export const sub = x => y => x - y;
export const neg = x => -x;
export const inv = x => 1 / x;
