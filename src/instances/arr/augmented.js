import { implement } from "../../plumbing";
import { Functor, Foldable, Apply, Chain, Traversable } from "../../classes";

import * as _Arr from ".";

export const Arr =
  _Arr
  |> implement(Functor)
  |> implement(Apply)
  |> implement(Chain)
  |> implement(Foldable)
  |> implement(Traversable);
