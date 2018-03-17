// Promises aren't actually proper functors/monads, these instances are a lie

// Functor
export const map = f => p => p.then(f);

// Applicative
export const pure = x => Promise.resolve(x);
export const liftA2 = f => p1 => chain(x => p1 |> map(f(x)));

// Monad
export const chain = map; // http://bit.ly/2FQIBGV
