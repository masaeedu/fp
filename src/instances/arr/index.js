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
  const range = n =>
    Array(n)
      .fill(0)
      .map((_, i) => i);

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
  const mapWithKey = f => xs => xs.map((x, i) => f(i)(x));

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
  const scanl = f => a => as => {
    let acc = a;
    let result = Array(as.length + 1);
    result[0] = acc;
    for (let i = 0; i < as.length; i++) {
      acc = f(acc)(as[i]);
      result[i + 1] = acc;
    }
    return result;
  };

  // :: (a -> a -> a) -> [a] -> [a]
  const scanl1 = f =>
    match({
      Nil,
      Cons: x => scanl(f)(x)
    });

  // :: (a -> b -> b) -> b -> [a] -> [b]
  const scanr = f => a => as => {
    let acc = a;
    let result = Array(as.length + 1);
    result[as.length] = acc;
    for (let i = as.length - 1; i >= 0; i--) {
      acc = f(as[i])(acc);
      result[i] = acc;
    }
    return result;
  };

  // :: (a -> a -> a) -> [a] -> [a]
  const scanr1 = f => xs =>
    xs.length > 0 ? scanr(f)(xs[xs.length - 1])(xs.slice(0, -1)) : [];

  // Constructors
  // :: [a]
  const Nil = [];

  // :: a -> [a] -> [a]
  const Cons = x => xs => {
    let result = Array(xs.length + 1);
    result[0] = x;
    for (let i = 1; i <= xs.length; i++) {
      result[i] = xs[i - 1];
    }
    return result;
  };

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

  // TODO: Find a way to avoid having to define this here
  const fold = M => foldMap(M)(x => x);

  // Traversable
  // :: Applicative f -> (a -> f b) -> [a] -> f [b]
  const sequence = A => foldr(A.lift2(Cons))(A.of(empty));

  const traverse = A => f => as =>
    foldr(x => acc => A.lift2(Cons)(f(x))(acc))(A.of(empty))(as);

  // String names
  const fns = {};

  // Functor

  // :: (a -> b) -> [a] -> [b]
  const map = f => xs => xs.map(f);

  fns["$>"] = xs => a => Array(xs.length).fill(a);
  fns["<$"] = a => xs => fns["$>"](xs)(a);

  // Apply
  const ap = fs => as => {
    const fl = fs.length;
    const al = as.length;
    let result = Array(fl * al);
    let idx = 0;
    for (let i = 0; i < fl; i++) {
      for (let j = 0; j < al; j++) {
        result[idx] = fs[i](as[j]);
        idx += 1;
      }
    }
    return result;
  };

  fns["*>"] = xs => ys => ap(fns["$>"](xs)(x => x))(ys);
  fns["<*"] = ys => xs => fns["*>"](xs)(ys);

  // Monad
  // :: x -> [x]
  const of = x => [x];

  const chain = f => as => {
    let result = [];
    for (let i = 0; i < as.length; i++) {
      const ir = f(as[i]);
      for (let j = 0; j < ir.length; j++) {
        result.push(ir[j]);
      }
    }
    return result;
  };

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
    fold,
    // Traversable
    sequence,
    traverse,
    // Functor
    map,
    // Apply
    ap,
    // Monad
    of,
    chain,
    // String names
    ...fns
  };

  return _;
})();

module.exports = Arr;
