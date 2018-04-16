// Promises aren't actually proper functors/monads, these instances are a lie

// Functor
export const map = f => p => p.then(f);

// Applicative
export const of = x => Promise.resolve(x);
export const lift2 = f => p1 => p2 =>
  p2 |> chain(y => p1 |> chain(x => f(x)(y)));

// Monad
export const chain = map; // http://bit.ly/2FQIBGV
