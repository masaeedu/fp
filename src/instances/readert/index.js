const Fn = require("../fn");

// :: type ReaderT r m a = r -> m a

// :: Monad m -> Monad (ReaderT r m)
const ReaderT = M => {
  // Monad
  // :: x -> ReaderT r m x
  const of = x => Fn.const(M.of(x));

  // :: (a -> ReaderT r m b) -> ReaderT r m a -> ReaderT r m b
  const chain = armb => rma => r => M.chain(a => armb(a)(r))(rma(r));

  // MonadTrans
  // :: m :~> ReaderT r m
  const lift = Fn.const;

  // MFunctor
  // :: (m :~> n) -> ReaderT r m :~> ReaderT r n
  const mmap = n => rma => r => n(rma(r));

  // MonadReader
  // :: ReaderT r m r
  const ask = M.of;

  return { of, chain, lift, mmap, ask };
};

module.exports = ReaderT;
