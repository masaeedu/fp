// Misc
export const last = as => as[as.length - 1];
export const lastN = n => as => as.slice(as.length - n);
export const range = n => [...Array(n).keys()];

// Algebra
export const Nil = [];
export const Cons = x => xs => [x, ...xs];
export const match = ({ Nil, Cons }) => xs =>
  xs.length === 0 ? Nil : Cons(xs[0])(xs.slice(1));

// Identity
export const is = x => Array.isArray(x);

// Functor
export const map = f => as => as.map(f);

// Applicative
export const of = x => [x];
export const lift2 = f => a1 => a2 =>
  a1 |> foldl(b => a => a2 |> map(f(a)) |> append(b))(empty);

// Monoid
export const empty = [];
export const append = a1 => a2 => [...a1, ...a2];

// Monad
export const chain = f => foldl(b => a => f(a) |> append(b))(empty);

// Foldable
export const foldl = f => z => as => as.reduce((p, c) => f(p)(c), z);

// Traversable
export const sequence = A =>
  foldl(A.lift2(b => a => of(a) |> append(b)))(A.of(empty));
