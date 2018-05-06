import { match as natch } from "natch";

import { typeid, fail } from "../plumbing";

import * as Obj from "../instances/obj";
import * as Arr from "../instances/arr";
import * as Fn from "../instances/fn";
import { otherwise } from "natch";

// Typed holes
export const _ = Symbol("ADT arbitrary type");

// ADT structure symbols
const idKey = Symbol("ADT identifier key");
const caseKey = Symbol("ADT case key");
const valsKey = Symbol("ADT values key");

export const adt = def => {
  const id = Symbol();

  const is = x => x[idKey] === id;

  const keys = Obj.keys(def);

  const isTypeId = x => x === _;

  // :: (Undefined | TypeId | [TypeId]) -> [TypeId]
  const desugarDef = natch(
    typeid,
    ["Undefined", Fn.const(Arr.empty)],
    ["Array", Fn.id],
    [
      otherwise,
      natch(
        isTypeId,
        [true, Arr.of],
        [false, _ => fail("Invalid constructor definition")]
      )
    ]
  );

  const constrs =
    keys
    |> Arr.map(k => {
      const cdef = desugarDef(def[k]);
      const n = cdef.length;
      return [
        k,
        Fn.curryN(n)(vals => ({ [idKey]: id, [caseKey]: k, [valsKey]: vals }))
      ];
    })
    |> Obj.fromPairs;

  const match = cases => ({ [caseKey]: c, [valsKey]: v }) =>
    Fn.uncurry(cases[c])(v);

  return { is, ...constrs, match, def };
};
