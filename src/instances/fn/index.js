const Arr = require("../arr");

const Fn = (() => {
  const _ = {};

  // :: type Function a b = a -> b

  // Identifiable
  // :: ((Function _ _) -> 'true) & (~(Function _ _) -> 'false)
  const is = x => typeof x === "function";

  // Category
  // :: Function a a
  const id = x => x;
  // :: Function b c -> Function a b -> Function a c
  const compose = f => g => a => f(g(a));

  // Misc
  // :: x -> _ -> x
  _["const"] = x => _ => x;
  // :: (a -> b -> c) -> (b -> a -> c)
  const flip = f => x => y => f(y)(x);

  // Composing arrays of functions
  // :: type ComposableList a b = '[a -> x, ...(ComposableList x b)]
  // :: ComposableList a b -> a -> b
  const pipe = flip(Arr.foldl(flip(id)));
  // :: a -> ComposableList a b -> b
  const passthru = flip(pipe);

  // Currying and uncurrying
  // :: type Foldr r z xs where
  // ::      Foldr _ z '[]         = z
  // ::      Foldr r z '[x, ...xs] = r x (Foldr r z xs)

  // :: type Curried xs r = Foldr (->) r xs

  // :: Curried as r -> as -> r
  const uncurry = Arr.foldl(id);

  // :: type FoldMap m@({ empty, append }) f xs where
  // ::      FoldMap _ _ '[]         = empty
  // ::      FoldMap _ _ '[x, ...xs] = append (f x) (Fold m f xs)

  // :: type Const a b = a

  // :: type Sum = '{ empty: '0, append: '+ }
  // :: type Length = FoldMap Sum (Const '1)

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
  // :: (a -> b) -> Function i a -> Function i b
  const map = compose;

  // Contravariant
  // :: (b -> a) -> Function a o -> Function b o
  const contramap = f => g => x => g(f(x));

  // Chain
  // :: x -> Function i x
  const of = _["const"];
  // :: (a -> Function i b) -> Function i a -> Function i b
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
