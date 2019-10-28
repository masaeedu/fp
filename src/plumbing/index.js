export * from "./fail";
export * from "./log";
export * from "./typeid";

// NB: Not allowed to reference augmented typeclasses directly from ../index.js
//     because this would be circular 😞
import * as Obj from "../instances/obj";
import * as Arr from "../instances/arr";
import * as Fn from "../instances/fn";
import * as IntSum from "../instances/int/sum";

export const implement = ({ mdefs, methods }) => candidate => {
  const weightedGiven = Obj.map(a => [1, a])(candidate);
  const missing = Arr.filter(k => !Obj.hasKey(k)(weightedGiven))(
    Obj.keys(mdefs)
  );

  const finished = a => b => sameKeys(a)(b) && sameWeights(a)(b);

  const derived = Obj.map(second)(
    refoldlUntil(finished)(shortestPath(mdefs))(weightedGiven)(missing)
  );

  return Obj.append(derived)(methods(derived));
};

// :: ClassDef -> WeightedDict -> String -> WeightedDict
const shortestPath = mdefs => dict => x => {
  const target = mdefs[x];
  const derived = Arr.foldMap(weightedInsert)(({ deps, fn }) => {
    return hasKeys(deps)(dict)
      ? { [x]: [sumDeps(dict)(deps) + 1, fn(Obj.map(second)(dict))] }
      : weightedInsert.empty;
  })(target);
  return weightedInsert.append(dict)(derived);
};

const sumDeps = d => ns => Arr.foldMap(IntSum)(n => first(d[n]))(ns);

// A monoid on Compose Obj (Int,) that is biased to the lowest Int
// e.g. { foo: [1, 'a'] } <> { foo: [2, 'b'] } === { foo: [1, 'a'] }
const weightedInsert = {
  append: o1 => o2 => {
    const xs = Obj.zipWith(a => b => {
      const [w1] = a;
      const [w2] = b;
      return w1 <= w2 ? a : b;
    })(o1)(o2);
    return Arr.foldMap(Obj)(Fn.id)([o1, o2, xs]);
  },
  empty: {}
};

// Feed the results of a foldl back into itself until a predicate
// on the current and previous result is satisfied
const refoldlUntil = pred => f => b => as => {
  const rec = nres => {
    const res1 = Arr.foldl(f)(nres)(as);
    const res2 = Arr.foldl(f)(res1)(as);
    if (pred(res1)(res2)) {
      return res1;
    } else {
      return rec(res2);
    }
  };
  return rec(b);
};

const hasKeys = ks => o => Arr.foldMap(and)(k => Obj.hasKey(k)(o))(ks);

const sameKeys = o1 => o2 => {
  const a = sortedKeys(o1);
  const b = sortedKeys(o2);
  return (
    a.length === b.length &&
    Arr.foldMap(and)(Fn.id)(Arr.zipWith(a => b => a === b)(a)(b))
  );
};

const sameWeights = o1 => o2 => {
  return Obj.foldMap(and)(Fn.id)(
    Obj.zipWith(a => b => first(a) === first(b))(o1)(o2)
  );
};

const sortedKeys = o => Obj.keys(o).sort();

const second = ([a, b]) => b;
const first = ([a, b]) => a;

const and = { append: a => b => a && b, empty: true };

export const trace = id => {
  const rec = i => f => input => {
    console.log({ id, i, input });
    const result = f(typeof input === "function" ? rec(i + 1)(input) : input);
    console.log({ id, i, result });
    return typeof result === "function" ? rec(i + 1)(result) : result;
  };
  return rec(0);
};

export const type = Types => x => Types.find(T => T.is(x));
