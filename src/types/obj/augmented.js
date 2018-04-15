import { implement } from "../../plumbing";
import { Functor, Apply, Foldable, Traversable } from "../../classes";

import * as _Obj from ".";

export const Obj =
  _Obj
  |> implement(Functor)
  |> implement(Apply)
  |> implement(Foldable)
  |> implement(Traversable);
