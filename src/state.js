// Misc

// Functor
export const map = f => s => x0 => {
  const [v, x1] = s(x0);
  return [f(v), x1];
};

// Applicative
export const of = a => x => [a, x];
export const lift2 = f => s1 => s2 => x0 => {
  const [v1, x1] = s1(x0);
  const [v2, x2] = s2(x1);
  return x => [f(v1)(v2), x];
};

// Monad
export const chain = f => s => x0 => {
  const [v, x1] = s(x0);
  return f(v)(x1);
};
