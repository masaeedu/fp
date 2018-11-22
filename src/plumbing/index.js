export * from "./fail";
export * from "./log";
export * from "./typeid";

// NB: Not allowed to reference augmented typeclasses directly from ../index.js
//     because this would be circular 😞
import * as Obj from "../instances/obj";
import * as Arr from "../instances/arr";
import * as Fn from "../instances/fn";

const augmentDef = def => ({ impl, deps }) => {
  const defHasKey = def |> Fn.flip(Obj.hasKey);
  const hasImpl = Obj.keys(impl).some(defHasKey);
  const hasDeps = deps.every(defHasKey);

  return hasImpl || !hasDeps
    ? def
    : impl |> Obj.map(i => i(def)) |> Obj.append(def);
};

// Typeclass wrapper
export const implement = ({ mdefs, methods }) => candidate => {
  // Add every available default definition that isn't explicitly specified
  const fullDef = mdefs |> Arr.foldl(augmentDef)(candidate);

  // Add the methods
  const withMethods = { ...fullDef, ...(fullDef |> methods) };

  return withMethods;
};

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
