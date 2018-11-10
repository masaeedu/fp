import { implement } from "../../plumbing";
import { Functor, Apply, Chain } from "../../classes";

import * as Cont_ from ".";

export const Cont =
  Cont_
  |> implement(Chain)
  |> implement(Apply)
  |> implement(Functor)
  |> implement(Apply);
