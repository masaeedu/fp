const Arr = (() => {
  // Misc
  const last = as => as[as.length - 1];
  const lastN = n => as => as.slice(as.length - n);
  const range = n => [...Array(n).keys()];
  const filter = f => xs => xs.filter(f);
  const replicate = n => v => range(n).map(_ => v);
  const includes = x => xs => xs.includes(x);
  const intersect = xs => filter(y => includes(y)(xs));

  // Constructors
  const Nil = [];
  const Cons = x => xs => [x, ...xs];
  const match = ({ Nil, Cons }) => xs =>
    xs.length === 0 ? Nil : Cons(xs[0])(xs.slice(1));

  // Identifiable
  const is = x => Array.isArray(x);

  // Monoid
  const empty = [];
  const append = xs => ys => [...xs, ...ys];

  // Foldable
  const foldr = f => z => xs => xs.reduceRight((p, c) => f(c)(p), z);
  const foldl = f => z => xs => xs.reduce((p, c) => f(p)(c), z);
  const foldMap = M => f => foldr(a => M.append(f(a)))(M.empty);

  // Traversable
  const sequence = A => foldr(A.lift2(Cons))(A.of(empty));

  // Functor
  const map = f => xs => xs.map(f);

  // Monad
  const of = x => [x];
  const chain = f => foldMap(Arr)(f);

  // prettier-ignore
  const _ = {
    // Misc
    last, lastN, range, filter, replicate, includes, intersect,
    // Constructors
    Nil, Cons, match,
    // Identifiable
    is,
    // Monoid
    empty, append,
    // Foldable
    foldr, foldl, foldMap,
    // Traversable
    sequence,
    // Functor
    map,
    // Monad
    of, chain
  };

  return _;
})();

module.exports = Arr;
