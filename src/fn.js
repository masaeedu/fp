// Misc
export const pipe = fs => fs.reduce((g, f) => a => f(g(a)));
export const id = _ => _;
export const konst = x => _ => x;

// Identity
export const is = x => typeof x === "function";
