// Types
import * as Fn from "./fn";
import * as Prm from "./prm";
import * as State from "./state";
import * as Unit from "./unit";
import * as Str from "./str";
import * as Int from "./int";
import * as Functor from "./functor";

export { Fn, Prm, State, Unit, Str, Int, Functor };

export * from "./arr/augmented";
export * from "./either/augmented";
export * from "./iter/augmented";
export * from "./obj/augmented";

export const type = Types => x => Types.find(T => T.is(x));
