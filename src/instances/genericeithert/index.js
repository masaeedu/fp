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
  // :: x -> GenericEitherT g e m x
  const of = x => M.of(Right(x));

  // :: (a -> GenericEitherT g e m b) -> GenericEitherT g e m a -> GenericEitherT g e m b
  const chain = f => M.chain(match({ Left: l => M.of(Left(l)), Right: f }));

  // Traversable
  // :: Applicative f -> (a -> f b) -> GenericEitherT g e m a -> f (GenericEitherT g e m b)
  const traverse = A => f =>
    match({ Left: x => A.of(Left(x)), Right: x => A.map(Right)(f(x)) });

  // Bifunctor
  // :: (l -> l') -> (r -> r') -> GenericEitherT g l m r -> GenericEitherT g l' m r'
  const bimap = l => r =>
    match({ Left: x => Left(l(x)), Right: x => Right(r(x)) });

  // MonadTrans
  // :: m :~> GenericEitherT g e m
  const lift = M.map(Right);

  // MFunctor
  // :: (m :~> n) -> (GenericEitherT g e m :~> GenericEitherT g e n)
  const mmap = n => n;

  return { of, chain, traverse, bimap };
};

module.exports = GenericEitherT;
