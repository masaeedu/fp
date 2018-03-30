// Misc
export const pipe = fs => fs.reduce((g, f) => a => f(g(a)));
export const id = _ => _;
const konst = x => _ => x;
export { konst as const };

// Identity
export const is = x => typeof x === "function";
