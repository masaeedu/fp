import * as Fn from "../fn";

// Misc
export const run = cont => cont(Fn.id);

// Functor
//        :: (a -> b) -> ((a -> r) -> r) -> ((b -> r) -> r)
export const map = f => contA => fb => contA(a => fb(f(a)));

// Monad
//        :: x -> ((x -> r) -> r)
export const of = x => cont => cont(x);

//        :: (a -> ((b -> r) -> r))
//           -> ((a -> r) -> r)
//           -> ((b -> r) -> r)
export const chain = f => contA => fb => contA(a => f(a)(fb));
