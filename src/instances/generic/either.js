import { implement } from "../../plumbing";
import {
  Chain,
  Apply,
  Functor,
  Traversable,
  Foldable,
  Bifunctor
} from "../../classes";

export default ({ Left, Right, match }) => {
  // Monad
  const of = Right;
  const chain = f => match({ Left, Right: f });

  // Traversable
  const traverse = A => f =>
    match({ Left: x => A.of(Left(x)), Right: x => A.map(Right)(f(x)) });

  // Bifunctor
  const bimap = l => r =>
    match({ Left: x => l(x) |> Left, Right: x => r(x) |> Right });

  return (
    { of, chain, traverse, bimap }
    |> implement(Chain)
    |> implement(Apply)
    |> implement(Functor)
    |> implement(Apply)  // lift2 depends on functor, so we have to do this twice. TODO: do dependency solving and get rid of this shit
    |> implement(Traversable)
    |> implement(Foldable)
    |> implement(Bifunctor)
  );
};
