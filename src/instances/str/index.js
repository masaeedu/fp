const Str = (() => {
  // Identity
  const is = x => typeof x === "string";

  // Algebra
  const Nil = "";
  const Cons = x => xs => `${x}${xs}`;
  const match = ({ Nil, Cons }) => s =>
    s === "" ? Nil : Cons(s[0])(s.slice(1));

  // Monoid
  const empty = "";
  const append = a => b => a + b;

  // Misc
  const escapeRegex = string => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const replace = x => y => s => s.replace(new RegExp(escapeRegex(x), "g"), y);

  return { is, Nil, Cons, match, empty, append, escapeRegex, replace };
})();

module.exports = Str;
