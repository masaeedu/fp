// Misc
export const add = x => y => x + y;
export const sub = x => y => x - y;
export const mul = x => y => x * y;
export const div = x => y => Math.floor(x / y);
export const neg = sub(0);

// Identity
export const is = x => typeof x === "number" && Number.isInteger(x);
