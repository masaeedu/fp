// Misc
export const pipe = fs => fs.reduce((g, f) => a => f(g(a)));
export const id = _ => _;

// Identity
export const is = x => typeof x === "function";
