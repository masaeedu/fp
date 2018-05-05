import * as Arr from "../arr";

// Category
export const id = _ => _;
export const compose = f => g => a => f(g(a));

// Misc
const _const = x => _ => x;
export { _const as const };
export const flip = f => x => y => f(y)(x);
export const pipe = Arr.foldl(flip(compose))(id); // TODO: Consider manually inlining for performance
export const uncurry = Arr.foldl(id);
export const curryN = n => f => {
  const loop = a => acc => (a === 0 ? f(acc) : x => loop(a - 1)([...acc, x]));
  return loop(n)([]);
};

// Identity
export const is = x => typeof x === "function";

// Functor
export const map = compose;
