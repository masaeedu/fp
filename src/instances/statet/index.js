const StateT = M => {
  // :: type StateT s m a = s -> m [a, s]

  // Monad
  // :: a -> StateT s m a
  const of = a => s => M.of([a, s]);
  // :: (a -> StateT s m b) -> StateT s m a -> StateT s m b
  const chain = amb => ma => x0 => M.chain(([a, x1]) => amb(a)(x1))(ma(x0));

  // MonadTrans
  // :: m :~> StateT s m
  const lift = ma => s => M.map(a => [a, s])(ma);

  // MFunctor
  // :: (m :~> n) -> StateT s m :~> StateT s n
  const mmap = n => sma => s => n(sma(s));

  // MonadState
  // :: StateT s m s
  const get = s => M.of([s, s]);
  // :: s -> StateT s m ()
  const put = s => _ => M.of([undefined, s]);
  // :: (s -> s) -> StateT s m ()
  const modify = f => chain(s => put(f(s)))(get);

  return { of, chain, lift, mmap, get, put, modify };
};

module.exports = StateT;
