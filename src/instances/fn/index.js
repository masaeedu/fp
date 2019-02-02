const Arr = require("../arr");

const Fn = (() => {
  const _ = {};

  // Identifiable
  // :: (((->) _ _) -> 'true) & (~((->) _ _) -> 'false)
  const is = x => typeof x === "function";

  // Category
  // :: x -> x
  const id = x => x;
  // :: (b -> c) -> (a -> b) -> (a -> c)
  const compose = f => g => a => f(g(a));

  // Misc
  // :: x -> _ -> x
  _["const"] = x => _ => x;
  // :: (a -> b -> c) -> (b -> a -> c)
  const flip = f => x => y => f(y)(x);
  // :: type ComposableList a b = '[a -> x, ...(ComposableList x b)]
  // :: ComposableList a b -> a -> b
  const pipe = fs => x => fs.reduce((p, f) => f(p), x);
  // :: a -> ComposableList a b -> b
  const passthru = flip(pipe);
  // :: type Curried '[]         r = r
  // ::      Curried '[x, ...xs] r = x -> Curried xs r
  // :: Curried a r -> a -> r
  const uncurry = Arr.foldl(id);
  // :: type Length '[]         = '0
  // ::      Length '[x, ...xs] = '1 + Length xs
  // :: Length as -> (as -> r) -> Curried as r
  const curryN = n => f => {
    const loop = a => acc => (a === 0 ? f(acc) : x => loop(a - 1)([...acc, x]));
    return loop(n)([]);
  };

  // :: x -> (x -> y) -> y
  const feed = x => f => f(x);
  _["$"] = feed;
  _["|>"] = id;

  // Functor
  // :: (a -> b) -> (->) i a -> (->) i b
  const map = compose;

  // Contravariant
  // :: (a -> b) -> (b -> c) -> (a -> c)
  const contramap = f => g => x => g(f(x));

  // Chain
  // :: x -> (->) i x
  const of = _["const"];
  // :: (a -> (->) i b) -> (->) i a -> (->) i b
  const chain = f => fn => x => f(fn(x))(x);

  // prettier-ignore
  return {
    ..._,
    // Identifiable
    is,
    // Category
    id, compose,
    // Misc
    flip, pipe, passthru, uncurry, curryN, feed,
    // Functor
    map,
    // Contravariant
    contramap,
    // Chain
    of, chain
  };
})();

module.exports = Fn;
