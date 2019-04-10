// :: type Kleisli m a b = a -> m b
// :: Monad m -> Category (Kleisli m)
const Kleisli = M => {
  // :: Kleisli m a a
  const id = M.of;
  // :: Kleisli m b c -> Kleisli m a b -> Kleisli m a c
  const compose = kbc => kab => a => M.chain(kbc)(kab(a));

  return { id, compose };
};

module.exports = Kleisli;
