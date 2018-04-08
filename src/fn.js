// Misc
export const pipe = fs => fs.reduce((g, f) => a => f(g(a)));
export const id = _ => _;
const _const = x => _ => x;
export { _const as const };

// Identity
export const is = x => typeof x === "function";
