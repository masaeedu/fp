// Types
import * as Arr from "./arr";
import * as Iter from "./iter";
import * as Obj from "./obj";
import * as Fn from "./fn";
import * as Prm from "./prm";
import * as State from "./state";
import * as Unit from "./unit";
import * as Str from "./str";
import * as Int from "./int";
import * as Either from "./either";
import * as Functor from "./functor";

export { Arr, Iter, Fn, Prm, Obj, State, Unit, Str, Int, Either, Functor };

export const type = Types => x => Types.find(T => T.is(x));
