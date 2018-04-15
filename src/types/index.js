// Types
import * as Fn from "./fn";
import * as Prm from "./prm";
import * as State from "./state";
import * as Unit from "./unit";
import * as Str from "./str";
import * as Fnctr from "./fnctr";

export { Fn, Prm, State, Unit, Str, Fnctr };

export * from "./int/augmented";
export * from "./arr/augmented";
export * from "./either/augmented";
export * from "./iter/augmented";
export * from "./obj/augmented";

export const type = Types => x => Types.find(T => T.is(x));
