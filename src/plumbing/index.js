// NB: Not allowed to reference augmented typeclasses directly from ./index.js
//     because this would be circular 😞
import * as Obj from "../obj";
import * as Iter from "../iter";

const augmentDef = def => ({ impl, deps }) => {
  const hasImpl = Obj.keys(impl).some(k => !!def[k]);
  const hasDeps = deps.every(k => !!def[k]);

  return hasImpl || !hasDeps
    ? def
    : impl |> Obj.map(i => i(def)) |> Obj.append(def);
};

// Typeclass wrapper
export const implement = ({ mdefs, methods }) => candidate => {
  // Add every available default definition that isn't explicitly specified
  const fullDef = mdefs |> Iter.fold(augmentDef)(candidate);

  // Add the methods
  const withMethods = { ...fullDef, ...(fullDef |> methods) };

  return withMethods;
};
