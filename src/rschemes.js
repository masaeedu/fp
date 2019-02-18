// :: type Algebra f a = f a -> a
// :: type Coalgebra f a = a -> f a

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

  return { cata, ana, hylo };
})();

module.exports = RSchemes;
