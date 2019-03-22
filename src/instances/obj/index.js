const { _ } = require("@masaeedu/infix");

const Fn = require("../fn");
const Arr = require("../arr");
const { typeid } = require("../../plumbing/typeid");

const Obj = (() => {
  // Constructors
  const Empty = {};
  const With = k => v => o => ({ [k]: v, ...o });
  const match = ({ Empty, With }) => o => {
    const f = Arr.match({
      Nil: Empty,
      Cons: k => _ => {
        const { [k]: v, ...o_ } = o;
        return With(k)(v)(o_);
      }
    });
    return f(keys(o));
  };

  // Misc
  const keys = o => Object.keys(o);

  const values = o =>
    _(Fn)(o)
      ["|>"](keys)
      ["|>"](Arr.map(k => o[k]))._;

  const pairs = o => Arr.map(k => [k, o[k]])(keys(o));

  const fromPairs = pairs => Arr.foldMap(Obj)(Fn.uncurry(embed))(pairs);

  // :: Object k v -> Object k (k, v)
  const withKey = match({
    Empty,
    With: k => v => o => With(k)([k, v])(withKey(o))
  });

  const embed = k => v => ({ [k]: v });

  const hasKey = k => o => o.hasOwnProperty(k);

  const get = k => o => o[k];

  const over = k => f => v => ({ ...v, [k]: f(v[k]) });

  const zipWith = f => o1 => o2 => {
    const k1 = keys(o1);
    const k2 = keys(o2);

    const ks = Arr.intersect(k1)(k2);

    return Arr.foldMap(Obj)(k => embed(k)(f(o1[k])(o2[k])))(ks);
  };

  // Identifiable
  const is = x => typeid(x) === "Object";

  // Functor
  const map = f => {
    const rec = match({ Empty, With: k => v => o => With(k)(f(v))(rec(o)) });
    return rec;
  };

  // Apply
  const lift2 = zipWith;

  // Monoid
  const empty = {};
  const append = o1 => o2 => ({ ...o1, ...o2 });

  // Traversable
  const traverse = A => f => {
    const rec = match({
      Empty: A.of(Empty),
      With: k => v => o => A.lift2(With(k))(f(v))(rec(o))
    });

    return rec;
  };

  // Foldable
  const foldl = f => z => Fn.pipe([values, Arr.foldl(f)(z)]);

  // :: (k -> a -> b) -> Object k a -> Object k b
  const mapWithKey = f => Fn.pipe([withKey, map(Fn.uncurry(f))]);

  // :: Applicative f -> (k -> a -> f b) -> Object k a -> f (Object k b)
  const traverseWithKey = A => f =>
    Fn.pipe([withKey, traverse(A)(Fn.uncurry(f))]);

  // :: Monoid m -> (k -> a -> m) -> Object k a -> Object k m
  const foldMapWithKey = M => f =>
    Fn.pipe([withKey, foldMap(M)(Fn.uncurry(f))]);

  // :: [k] -> Object k k
  const mirror = Arr.foldMap({ empty, append })(k => embed(k)(k));

  return {
    // Constructors
    Empty,
    With,
    match,
    // Misc
    keys,
    values,
    pairs,
    fromPairs,
    embed,
    hasKey,
    get,
    over,
    zipWith,
    // Identifiable
    is,
    // Functor
    map,
    // Apply
    lift2,
    // Monoid
    empty,
    append,
    // Traversable
    traverse,
    // Foldable
    foldl,
    // Misc
    mirror,
    withKey,
    mapWithKey,
    traverseWithKey,
    foldMapWithKey
  };
})();

module.exports = Obj;
