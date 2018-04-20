import * as Obj from "../types/obj";
import * as Arr from "../types/arr";
import * as Fn from "../types/fn";

// Typed holes
export const a = Symbol("a");
export const b = Symbol("b");
export const c = Symbol("c");

// ADT structure symbols
const caseKey = Symbol("ADT case key");
const valsKey = Symbol("ADT values key");

const uncurry = Arr.foldl(f => x => f(x));
const curryN = n => f => {
  const loop = a => acc => (a === 0 ? f(acc) : x => loop(a - 1)([...acc, x]));
  return loop(n)([]);
};

export const adt = def => {
  const keys = Obj.keys(def);

  const constrs =
    keys
    |> Arr.map(k => {
      const n = def[k].length;
      return [k, curryN(n)(vals => ({ [caseKey]: k, [valsKey]: vals }))];
    })
    |> Obj.fromPairs;

  const match = cases => ({ [caseKey]: c, [valsKey]: v }) =>
    uncurry(cases[c])(v);

  return { ...constrs, match };
};
