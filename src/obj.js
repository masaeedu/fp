import { Fn, Arr, Log } from ".";

// Misc
export const keys = o => Object.keys(o);
export const pairs = o => keys(o) |> Arr.map(k => [k, o[k]]);
export const embed = k => v => ({ [k]: v });

// Identity
export const is = o => !!o && typeof o === "object";

// Functor
export const map = f => o =>
  pairs(o) |> Arr.fold(([k, v]) => embed(k)(f(v)) |> append)(empty);

// Monoid
export const empty = {};
export const append = o1 => o2 => ({ ...o1, ...o2 });

// Traversable
export const sequence = ({ Applicative: { map, of, lift2 } }) => o =>
  pairs(o)
  |> Arr.map(([k, v]) => v |> map(embed(k)))
  |> (of(empty) |> Arr.fold(lift2(append)));
