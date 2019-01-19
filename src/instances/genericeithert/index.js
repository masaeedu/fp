// :: type GenericEitherT g e m a = m (g e a)
// :: type EitherLike g = {
// ::   Left: e -> g e a,
// ::   Right: a -> g e a,
// ::   match: ({ Left: e -> x, Right: a -> x }) -> g e a -> x
// :: }

// :: EitherLike g
// :: -> Monad m
// :: -> IntersectF
// ::      [Monad, Traversable, Bifunctor]
// ::      (GenericEitherT g e m)
const GenericEitherT = E => M => {
  const { Left, Right, match } = E;

  // Monad
  const of = x => M.of(Right(x));
  const chain = f => M.chain(match({ Left: l => M.of(Left(l)), Right: f }));

  // Traversable
  const traverse = A => f =>
    match({ Left: x => A.of(Left(x)), Right: x => A.map(Right)(f(x)) });

  // Bifunctor
  const bimap = l => r =>
    match({ Left: x => Left(l(x)), Right: x => Right(r(x)) });

  return { of, chain, traverse, bimap };
};

module.exports = GenericEitherT;
