export * from "./fail";
export * from "./log";
export * from "./typeid";

// NB: Not allowed to reference augmented typeclasses directly from ../index.js
//     because this would be circular 😞
import * as Obj from "../instances/obj";
import * as Arr from "../instances/arr";
import * as Fn from "../instances/fn";
import * as IntSum from "../instances/int/sum";

// Given a ClassDef and a dict that implements a minimal
// equivalent defintion of the class, find the shortest
// path to each derivable method in the `mdefs` and add it
// to the dict.

// The algorithm works by assigning weight 0 to functions
// in `canditate` and `1 + weight(deps)` to derived functions.
// Since we might not find all possible derivations with one
// pass over the `mdefs`, we keep attempting to derive
// until it is no longer productive, feeding the results
// of the previous step into the next.
// For example,
// Given:
//  ```
//  mdefs = {
//    foo: [{ deps: [], fn: foo }],
//    bar: [{ deps: ["foo"], fn: barFromFoo }],
//    baz: [{ deps: ["bar"], fn: bazFromBar }, { deps: ["foo"], fn: bazFromFoo }]
//  };
//  candidate = { foo };
//  ```
// 1) Weight the provided candidate functions with 0
//      `candidate1 = { foo: [0, foo] }`
// 2) Attempt to derive from the mdefs, weighting each derived function
//    with the sum of its dependencies:
//      a) Derive `bar` from `foo`, `weight = 1 + weight(foo) = 1`
//      b) Derive `baz` from `foo`, `weight = 1 + weight(foo) = 1`
// 3) Take the derived functions from step 2) and add them to the weighted
//    candidate dict if there are no key collisions:
//      `candidate2 = { foo: [0, foo], bar: [1, barFromFoo], baz: [1, bazfromFoo] }`
// 4) Since `canditate2 != candidate1`, Repeat step 2) with the new weighted dict:
//      a) Derive `baz` from `bar`, `weight = 1 + weight(bar) = 2`
// 5) We take the derived functions from step 4) and try to add them to
//    the weighted dict, but there is a key collision, as the dict already
//    contains `bar`:
//       ```
//          { foo: [0, foo], bar: [1, barFromFoo], baz: [1, bazFromFoo] }
//       <> { baz: [2, bazFromBar]}
//       ````
//    To deal with the collision, choose the entry with the lowest weight:
//      `candidate3 = { foo: [0, foo], bar: [1, barFromFoo], baz: [1, bazfromFoo] }`
// 6) Since `candidate3 == candidate2`, we are done. Return `candidate3`.
// :: ClassDef -> Dict -> Dict
export const implement = ({ mdefs, methods }) => candidate => {
  const weightedGiven = Obj.map(a => [0, a])(candidate);
  const missing = Arr.filter(k => !Obj.hasKey(k)(weightedGiven))(
    Obj.keys(mdefs)
  );

  const finished = a => b => sameKeys(a)(b) && sameWeights(a)(b);

  const derived = Obj.map(second)(
    refoldlUntil(finished)(shortestPath(mdefs))(weightedGiven)(missing)
  );

  return Obj.append(derived)(methods(derived));
};

// :: MDefs -> WeightedDict -> String -> WeightedDict
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

const weightedInsert = {
  append: Obj.appendWith(a => b => (first(a) <= first(b) ? a : b)),
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
