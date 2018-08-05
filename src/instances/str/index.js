// Identity
export const is = x => typeof x === "string";

// Algebra
export const Nil = "";
export const Cons = x => xs => `${x}${xs}`;
export const match = ({ Nil, Cons }) => s =>
  s === "" ? Nil : Cons(s[0])(s.slice(1));

// Monoid
export const empty = "";
export const append = a => b => a + b;
