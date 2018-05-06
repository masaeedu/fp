export * from "./fail";
export * from "./log";
export * from "./typeid";

// NB: Not allowed to reference augmented typeclasses directly from ../index.js
//     because this would be circular 😞
import * as Obj from "../instances/obj";
import * as Iter from "../instances/iter";
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
  const fullDef = mdefs |> Iter.foldl(augmentDef)(candidate);

  // Add the methods
  const withMethods = { ...fullDef, ...(fullDef |> methods) };

  return withMethods;
};

export const type = Types => x => Types.find(T => T.is(x));
