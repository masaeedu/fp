// Identity
export const is = x => typeof x === "number" && Number.isInteger(x);

// Monoid
export const Mul = (() => {
  const empty = 1;
  const append = x => y => x * y;

  return { empty, append };
})();
export const Add = (() => {
  const empty = 0;
  const append = x => y => x + y;

  return { empty, append };
})();
