import { Fn } from "..";
import { implement } from "../../plumbing";
import { Functor, Apply, Chain } from "../../classes";

// :: type ReaderT r m a = r -> m a

// :: Monad m -> Monad (ReaderT r m)
const ReaderT = M => {
  // :: x -> ReaderT r m x
  const of = x => Fn.const(M.of(x));

  // :: (a -> ReaderT r m b) -> ReaderT r m a -> ReaderT r m b
  const chain = armb => rma => r => rma(r) |> M.chain(a => armb(a)(r));

  return (
    { of, chain }
    |> implement(Chain)
    |> implement(Apply)
    |> implement(Functor)
    |> implement(Apply)
  );
};

export default ReaderT;
