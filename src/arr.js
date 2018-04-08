import { Fn, Log } from "./index";

// Misc
export const last = as => as[as.length - 1];
export const lastN = n => as => as.slice(as.length - n);
export const range = n => [...Array(n).keys()];

// Identity
export const is = x => Array.isArray(x);

// Functor
export const map = f => as => as.map(f);

// Applicative
export const of = x => [x];
export const lift2 = f => a1 => a2 =>
  a1 |> fold(b => a => a2 |> map(f(a)) |> append(b))(empty);

// Monoid
export const empty = [];
export const append = a1 => a2 => [...a1, ...a2];

// Monad
export const chain = f => fold(b => a => f(a) |> append(b))(empty);

// Foldable
export const fold = f => z => as => as.reduce((p, c) => f(p)(c), z);
