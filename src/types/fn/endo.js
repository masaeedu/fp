import * as Fn from ".";

// Functions of the type a -> a

// Monoid
export const empty = Fn.id;
export const append = Fn.compose;
