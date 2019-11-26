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

  const values = o => Arr.map(k => o[k])(keys(o));

  const pairs = o => Arr.map(k => [k, o[k]])(keys(o));

  const fromPairs = pairs => {
    let result = {};
    for (let i = 0; i < pairs.length; i++) {
      const [k, v] = pairs[i];
      result[k] = v;
    }
    return result;
  };

  const withKey = o => {
    let result = {};
    for (const k in o) {
      result[k] = [k, o[k]];
    }
    return result;
  };

  const embed = k => v => ({ [k]: v });

  const hasKey = k => o => o.hasOwnProperty(k);

  const get = k => o => o[k];

  const over = k => f => v => ({ ...v, [k]: f(v[k]) });

  const zipWith = f => a => b => {
    let result = {};
    for (const k in a) {
      if (hasKey(k)(b)) {
        result[k] = f(a[k])(b[k]);
      }
    }
    return result;
  };

  const appendWith = f => o1 => o2 => {
    let result = {};
    const ks = Arr.append(pairs(o1))(pairs(o2));
    for (let i = 0; i < ks.length; i++) {
      const [k, v] = ks[i];
      if (hasKey(k)(result)) {
        result[k] = f(result[k])(v);
      } else {
        result[k] = v;
      }
    }
    return result;
  };

  // Identifiable
  const is = x => typeid(x) === "Object";

  //Functor;
  const map = f => a => {
    let result = {};
    for (const k in a) {
      result[k] = f(a[k]);
    }
    return result;
  };

  // Apply
  const lift2 = zipWith;

  // Monoid
  const empty = {};

  const append = o1 => o2 => ({ ...o1, ...o2 });

  const traverse = A => f => a => {
    const ps = pairs(a);
    const tv = Arr.traverse(A)(([k, v]) => A.map(x => [k, x])(f(v)))(ps);
    return A.map(fromPairs)(tv);
  };

  // Foldable
  const foldr = f => z => o => Arr.foldr(f)(z)(values(o));
  const foldl = f => z => o => Arr.foldl(f)(z)(values(o));
  const foldMap = M => f => o => Arr.foldMap(M)(f)(values(o));

  // :: (k -> a -> b) -> Object k a -> Object k b
  const mapWithKey = f => o => map(([k, v]) => f(k)(v))(withKey(o));

  // :: Applicative f -> (k -> a -> f b) -> Object k a -> f (Object k b)
  const traverseWithKey = A => f => o =>
    traverse(A)(([k, v]) => f(k)(v))(withKey(o));

  // :: Monoid m -> (k -> a -> m) -> Object k a -> Object k m
  const foldMapWithKey = M => f => o =>
    foldMap(M)(([k, v]) => f(k)(v))(withKey(o));

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
    appendWith,
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
    foldr,
    foldl,
    foldMap,
    // Misc
    mirror,
    withKey,
    mapWithKey,
    traverseWithKey,
    foldMapWithKey
  };
})();

module.exports = Obj;
