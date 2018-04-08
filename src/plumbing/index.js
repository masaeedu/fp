// NB: Not allowed to reference *decorated* typeclasses directly from ./index.js
//     because this is circular
import * as Obj from "../obj";
import * as Iter from "../iter";

// TODO: Maybe delete
// ------------------------
// NB: Not allowed to reference any of our nice FP code in here unfortunately 😞
// Gets too confusing reasoning about circular dependencies
// ****Or does it?
// ------------------------

// Typeclass wrapper
export const implement = ({ mdefs, methods }) => candidate => {
  // Add every available default definition that isn't explicitly specified
  const fullDef =
    mdefs
    |> Iter.fold(def => ({ impl, deps }) => {
      const hasImpl = Obj.keys(impl).some(k => !!def[k]);
      const hasDeps = deps.every(k => !!def[k]);

      return hasImpl || !hasDeps
        ? def
        : impl |> Obj.map(i => i(def)) |> Obj.append(def);
    })(candidate);

  // Add the methods
  const withMethods = { ...fullDef, ...(fullDef |> methods) };

  return withMethods;
};
