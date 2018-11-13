import { implement } from "../../plumbing";
import {
  Chain,
  Apply,
  Functor,
  Traversable,
  Foldable,
  Bifunctor
} from "../../classes";

// :: type GenericEitherT g e m a = m (g e a)
// :: type EitherLike ge = { Left: e -> g e a, Right: a -> g e a, match: ({ Left: e -> x, Right: a -> x }) -> g e a -> x }

// :: EitherLike g -> Monad m -> (Monad (GenericEitherT g e m)) & (Traversable (g e)) & (Bifunctor g)
export const GenericEitherT = E => M => {
  const { Left, Right, match } = E;

  // Monad
  // :: x -> GenericEitherT g e m x
  const of = x => M.of(Right(x));
  // :: (a -> GenericEitherT g e m b) -> GenericEitherT g e m a -> GenericEitherT g e m b
  const chain = f => M.chain(match({ Left: l => M.of(Left(l)), Right: f }));

  // Traversable
  // :: Applicative a -> (x -> a y) -> g e (a x) -> a (g e x)
  const traverse = A => f =>
    match({ Left: x => A.of(Left(x)), Right: x => A.map(Right)(f(x)) });

  // Bifunctor
  // :: (e -> e') -> (a -> a') -> g e a -> g e' a'
  const bimap = l => r =>
    match({ Left: x => l(x) |> Left, Right: x => r(x) |> Right });

  return (
    { of, chain, traverse, bimap }
    |> implement(Chain)
    |> implement(Apply)
    |> implement(Functor)
    |> implement(Apply)  // lift2 depends on functor, so we have to do this twice. TODO: do dependency solving and get rid of this
    |> implement(Traversable)
    |> implement(Foldable)
    |> implement(Bifunctor)
  );
};
