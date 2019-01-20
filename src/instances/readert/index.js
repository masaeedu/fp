const Fn = require("../fn");

// :: type ReaderT r m a = r -> m a

// :: Monad m -> Monad (ReaderT r m)
const ReaderT = M => {
  // :: x -> ReaderT r m x
  const of = x => Fn.const(M.of(x));

  // :: (a -> ReaderT r m b) -> ReaderT r m a -> ReaderT r m b
  const chain = armb => rma => r => M.chain(a => armb(a)(r))(rma(r));

  return { of, chain };
};

module.exports = ReaderT;
