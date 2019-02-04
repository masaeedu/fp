const State = (() => {
  // :: type State s a = s -> [a, s]

  // Monad
  // :: a -> State x a
  const of = a => x => [a, x];
  // :: (a -> State b) -> State a -> State b
  const chain = amb => ma => x0 => {
    const [a, x1] = ma(x0);
    return amb(a)(x1);
  };

  // :: State s s
  const get = s => [s, s];
  // :: s -> State s ()
  const put = s => _ => [undefined, s];
  // :: (s -> s) -> State s ()
  const modify = f => chain(s => put(f(s)))(get);

  return { of, chain, get, put, modify };
})();

module.exports = State;
