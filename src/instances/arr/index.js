const Arr = (() => {
  // Misc
  // :: [a] -> (a | undefined)
  const last = as => as[as.length - 1];

  // :: n -> [a]@l -> [a]@n
  // :: where n :: ≤ l
  const lastN = n => as => as.slice(as.length - n);

  // :: type Range 0       = '[]
  // ::      Range (1 + n) = '[...(Range n), n]

  // :: n -> Range n
  const range = n => [...Array(n).keys()];

  // :: (x -> Boolean) -> [x] -> [x]
  const filter = f => xs => xs.filter(f);

  // :: n -> x -> [x]@n
  const replicate = n => v => range(n).map(_ => v);

  // :: x -> [x] -> Boolean
  // :: where x :: PrimEq
  const includes = x => xs => xs.includes(x);

  // :: [x] -> [x] -> [x]
  // :: where x :: PrimEq
  const intersect = xs => filter(y => includes(y)(xs));

  // :: (a -> b -> c) -> [a] -> [b] -> [c]
  const zipWith = f => xs => ys =>
    range(Math.min(xs.length, ys.length)).map(i => f(xs[i])(ys[i]));

  // :: [x] -> [x]
  // :: where x :: PrimEq
  const dedupe = xs => [...new Set(xs)];

  // :: (Natural -> a -> b) -> [a] -> [b]
  const mapWithKey = f => xs => xs.map((v, i) => f(i)(v));

  // :: (x -> k) -> [x] -> StrMap k [x]
  // :: where k :: PrimEq
  const groupBy = f => xs => {
    // :: [k]
    const domain = Arr.map(f)(xs);

    // :: k -> StrMap k [x]
    const proj = k => ({ [k]: xs.filter(x => f(x) === k) });

    return Arr.foldMap(Obj)(proj)(domain);
  };

  // :: (b -> a -> b) -> b -> [a] -> [b]
  const scanl = f => a =>
    match({
      Nil: [a],
      Cons: x => xs => Cons(a)(scanl(f)(f(a)(x))(xs))
    });

  // :: (a -> a -> a) -> [a] -> [a]
  const scanl1 = f =>
    match({
      Nil,
      Cons: x => scanl(f)(x)
    });

  // :: (a -> b -> b) -> b -> [a] -> [b]
  const scanr = f => a =>
    match({
      Nil: [a],
      Cons: x => xs => {
        const acc = scanr(f)(a)(xs);
        return Cons(f(x)(acc[0]))(acc);
      }
    });

  // :: (a -> a -> a) -> [a] -> [a]
  const scanr1 = f =>
    match({
      Nil,
      Cons: x => xs => {
        if (xs.length === 0) {
          return [x];
        } else {
          const acc = scanr1(f)(xs);
          return Cons(f(x)(acc[0]))(acc);
        }
      }
    });

  // Constructors
  // :: [a]
  const Nil = [];

  // :: a -> [a] -> [a]
  const Cons = x => xs => [x, ...xs];

  // :: ({ Nil: x, Cons: a -> [a] -> x }) -> [a] -> x
  const match = ({ Nil, Cons }) => xs =>
    xs.length === 0 ? Nil : Cons(xs[0])(xs.slice(1));

  // Identifiable
  // :: ([x] -> 'true) & (_ -> 'false)
  const is = x => Array.isArray(x);

  // Monoid
  // :: [a]
  const empty = [];

  // :: [a] -> [a] -> [a]
  const append = xs => ys => [...xs, ...ys];

  // Foldable
  // :: (a -> b -> b) -> b -> [a] -> b
  const foldr = f => z => xs => xs.reduceRight((p, c) => f(c)(p), z);

  // :: (b -> a -> b) -> b -> [a] -> b
  const foldl = f => z => xs => xs.reduce((p, c) => f(p)(c), z);

  // :: Monoid m -> (a -> m) -> [a] -> m
  const foldMap = M => f => foldr(a => M.append(f(a)))(M.empty);

  // Traversable
  // :: Applicative f -> (a -> f b) -> [a] -> f [b]
  const sequence = A => foldr(A.lift2(Cons))(A.of(empty));

  // Functor
  // :: (a -> b) -> [a] -> [b]
  const map = f => xs => xs.map(f);

  // Monad
  // :: x -> [x]
  const of = x => [x];

  // :: (a -> [b]) -> [a] -> [b]
  const chain = f => foldMap(Arr)(f);

  const _ = {
    // Misc
    last,
    lastN,
    range,
    filter,
    replicate,
    includes,
    intersect,
    zipWith,
    dedupe,
    mapWithKey,
    groupBy,
    scanl,
    scanl1,
    scanr,
    scanr1,
    // Constructors
    Nil,
    Cons,
    match,
    // Identifiable
    is,
    // Monoid
    empty,
    append,
    // Foldable
    foldr,
    foldl,
    foldMap,
    // Traversable
    sequence,
    // Functor
    map,
    // Monad
    of,
    chain
  };

  return _;
})();

module.exports = Arr;
