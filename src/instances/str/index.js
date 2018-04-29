// Identity
export const is = x => typeof x === "string";

// Monoid
export const empty = "";
export const append = a => b => a + b;
