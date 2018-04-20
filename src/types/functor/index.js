import * as Fn from "../fn";
import * as Obj from "../obj";

import * as Identity from "./identity";

// Category
export const id = Identity;
export const compose = Obj.zipWith(Fn.compose);
