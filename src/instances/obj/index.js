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

  const pairs = o =>
    _(Fn)(o)
      ["|>"](keys)
      ["|>"](Arr.map(k => [k, o[k]]))._;

  const fromPairs = pairs => Arr.foldMap(Obj)(Fn.uncurry(embed))(pairs);

  const mapWithKey = f =>
    Fn.pipe([pairs, Arr.map(([k, v]) => [k, f(k)(v)]), fromPairs]);

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
  const map = f => mapWithKey(_ => f);

  // Apply
  const lift2 = zipWith;

  // Monoid
  const empty = {};
  const append = o1 => o2 => ({ ...o1, ...o2 });

  // Traversable
  const sequence = A => {
    const rec = match({
      Empty: A.of(Empty),
      With: k => v => o => A.lift2(With(k))(v)(rec(o))
    });

    return rec;
  };

  // Foldable
  const foldl = f => z => Fn.pipe([values, Arr.foldl(f)(z)]);

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
    sequence,
    // Foldable
    foldl
  };
})();

module.exports = Obj;
