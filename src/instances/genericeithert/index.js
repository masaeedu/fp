const { Identity } = require("../fnctr");

// :: type GenericEitherT g e m a = m (g e a)
// :: type EitherLike g = {
// ::   Left: e -> g e a,
// ::   Right: a -> g e a,
// ::   match: ({ Left: e -> x, Right: a -> x }) -> g e a -> x
// :: }

// :: EitherLike g
// :: -> Monad m
// :: -> IntersectF
// ::      [Monad, Bifunctor, MonadTrans, MFunctor]
// ::      (GenericEitherT g e m)
const GenericEitherT = E => M => {
  const { Left, Right, match } = E;

  // Monad
  // :: x -> GenericEitherT g e m x
  const of = x => M.of(Right(x));

  // :: (a -> GenericEitherT g e m b) -> GenericEitherT g e m a -> GenericEitherT g e m b
  const chain = f => M.chain(match({ Left: l => M.of(Left(l)), Right: f }));

  // Bifunctor
  // :: (l -> l') -> (r -> r') -> GenericEitherT g l m r -> GenericEitherT g l' m r'
  const bimap = l => r =>
    M.map(match({ Left: x => Left(l(x)), Right: x => Right(r(x)) }));

  // Traversable
  // :: (Applicative f) -> (a -> f b) -> GenericEitherT g e m a -> f (GenericEitherT g e m b)
  const traverse = A => f =>
    M.traverse(A)(
      match({
        Left: e => A.of(Left(e)),
        Right: a => A.map(Right)(f(a))
      })
    );

  // :: e -> GenericEitherT g e m a
  const fail = e => M.of(Left(e));

  // :: (e -> GenericEitherT g e' m a) -> GenericEitherT g e m a -> GenericEitherT g e' m a
  const recover = f =>
    M.chain(
      match({
        Left: f,
        Right: a => M.of(Right(a))
      })
    );

  // MonadTrans
  // :: m :~> GenericEitherT g e m
  const lift = M.map(Right);

  // MFunctor
  // :: (m :~> n) -> (GenericEitherT g e m :~> GenericEitherT g e n)
  const mmap = n => n;

  return { of, chain, bimap, traverse, fail, recover, lift, mmap };
};

module.exports = GenericEitherT;
