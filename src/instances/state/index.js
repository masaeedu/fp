const State = (() => {
  // Monad
  const of = a => x => [a, x];
  const chain = f => s => x0 => {
    const [v, x1] = s(x0);
    return f(v)(x1);
  };

  return { of, chain };
})();

module.exports = State;
