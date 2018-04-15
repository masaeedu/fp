import * as Fn from "./fn";
import * as Arr from "./arr";

// Misc
export const keys = o => Object.keys(o);
export const values = o => keys(o) |> Arr.map(k => o[k]);
export const pairs = o => keys(o) |> Arr.map(k => [k, o[k]]);
export const fromPairs = pairs =>
  pairs |> Arr.map(([k, v]) => embed(k)(v)) |> Arr.foldl(append)(empty);
export const embed = k => v => ({ [k]: v });
export const hasKey = k => o => o.hasOwnProperty(k);
export const get = k => o => o[k];
export const over = k => f => v => ({ ...v, [k]: f(v[k]) });

// Identity
export const is = o => !!o && typeof o === "object";

// Functor
export const map = f => o =>
  pairs(o) |> Arr.foldl(b => ([k, v]) => embed(k)(f(v)) |> append(b))(empty);

// Monoid
export const empty = {};
export const append = o1 => o2 => ({ ...o1, ...o2 });

// Traversable
export const sequence = A => o =>
  pairs(o)
  |> Arr.map(([k, v]) => v |> A.map(embed(k)))
  |> (A.of(empty) |> Arr.foldl(A.lift2(append)));

// Foldable
export const foldl = f => z => o => keys(o) |> Arr.foldl(f)(z);
