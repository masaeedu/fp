import { Fn } from "../../..";
import { implement } from "../../../../plumbing";
import { Functor, Apply, Chain } from "../../../../classes";

const ReaderT = M => {
  // Monad
  const of = x => Fn.const(M.of(x));
  // :: (a -> r -> m b) -> (r -> m a) -> (r -> m b)
  const chain = f => x => r => x(r) |> M.chain(a => f(a)(r));

  return (
    { of, chain } |> implement(Chain) |> implement(Apply) |> implement(Functor)
  );
};

export default ReaderT;
