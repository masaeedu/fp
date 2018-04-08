// Plumbing
import { implement } from "./plumbing";

// Types
import * as Arr from "./arr";
import * as Iter_ from "./iter";
import * as Obj from "./obj";
import * as Fn from "./fn";
import * as Prm from "./prm";
import * as Log from "./log";
import * as State from "./state";
import * as Unit from "./unit";
import * as Str from "./str";
import * as Int from "./int";

// Classes
import * as Foldable from "./classes/foldable";

// Augment
const Iter = Iter_ |> implement(Foldable);

export { Arr, Iter, Fn, Prm, Obj, State, Log, Unit, Str, Int };
