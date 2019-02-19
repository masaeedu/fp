const { _ } = require("@masaeedu/infix");
const { implement, Category } = require(".");

// :: type Kleisli m a b = a -> m b
// :: Monad m -> Category (Kleisli m)
const Kleisli = M => {
  // :: Kleisli m a a
  const id = M.of;
  // :: Kleisli m b c -> Kleisli m a b -> Kleisli m a c
  const compose = kbc => kab => a => M.chain(kbc)(kab(a));

  return implement(Category)({ id, compose });
};

// :: type AlgebraM m f a = f a -> m a
// :: type Algebra = AlgebraM Identity
// :: type CoalgebraM m f a = a -> m (f a)
// :: type Coalgebra = CoalgebraM Identity

const RSchemes = (() => {
  // :: Functor f -> Algebra f a -> Fix f -> a
  const cata = F => alg => {
    const rec = x => alg(F.map(rec)(x));
    return rec;
  };

  // :: Functor f -> Coalgebra f a -> a -> Fix f
  const ana = F => coalg => {
    const rec = x => F.map(rec)(coalg(x));
    return rec;
  };

  // :: Functor f -> Algebra f b -> Coalgebra f a -> a -> b
  const hylo = F => alg => coalg => {
    const rec = x => alg(F.map(rec)(coalg(x)));
    return rec;
  };

  // :: Traversable f -> Monad m -> AlgebraM m f a -> Fix f -> m a
  const cataM = T => M => alg => {
    const rec = x => Kleisli(M)["<:"](alg)(T.traverse(rec))(x);
    return rec;
  };

  // :: Traversable f -> Monad m -> CoalgebraM m f a -> a -> m (Fix f)
  const anaM = T => M => coalg => {
    const rec = x => Kleisli(M)["<:"](T.traverse(rec))(coalg)(x);
    return rec;
  };

  // :: Traversable f -> Monad m -> AlgebraM m f b -> CoalgebraM m f a -> a -> m b
  const hyloM = T => M => alg => coalg => {
    const rec = x => Kleisli(M)[":[...]>"]([coalg, T.traverse(M)(rec), alg])(x);
    return rec;
  };

  return { cata, ana, hylo, cataM, anaM, hyloM };
})();

module.exports = RSchemes;
