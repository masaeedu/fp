import { implement } from "../../plumbing";
import { Functor, Apply, Chain, Foldable, Traversable } from "../../classes";

import * as _Iter from ".";

export const Iter =
  _Iter
  |> implement(Chain)
  |> implement(Apply)
  |> implement(Functor)
  |> implement(Apply)
  |> implement(Traversable)
  |> implement(Foldable);
