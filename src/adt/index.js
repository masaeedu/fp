import * as Obj from "../instances/obj";
import * as Arr from "../instances/arr";
import * as Fn from "../instances/fn";

// Typed holes
export const a = Symbol("a");
export const b = Symbol("b");
export const c = Symbol("c");

// ADT structure symbols
const caseKey = Symbol("ADT case key");
const valsKey = Symbol("ADT values key");

export const adt = def => {
  const keys = Obj.keys(def);

  const constrs =
    keys
    |> Arr.map(k => {
      const n = def[k].length;
      return [k, Fn.curryN(n)(vals => ({ [caseKey]: k, [valsKey]: vals }))];
    })
    |> Obj.fromPairs;

  const match = cases => ({ [caseKey]: c, [valsKey]: v }) =>
    Fn.uncurry(cases[c])(v);

  return { ...constrs, match, def };
};
