import { implement } from "../../plumbing";
import { Functor, Apply, Chain, Foldable, Traversable } from "../../classes";

import * as _Iter from ".";

export const Iter =
  _Iter
  |> implement(Functor)
  |> implement(Apply)
  |> implement(Chain)
  |> implement(Foldable)
  |> implement(Traversable);
