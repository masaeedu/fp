import { implement } from "../../plumbing";
import { Functor, Apply, Chain, Foldable, Traversable } from "../../classes";

import * as _Either from ".";

export const Either =
  _Either
  |> implement(Functor)
  |> implement(Apply)
  |> implement(Chain)
  |> implement(Traversable)
  |> implement(Foldable);
