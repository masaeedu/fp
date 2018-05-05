import { implement } from "../../plumbing";
import { Functor, Apply, Chain } from "../../classes";

import * as _Fn from ".";

export const Fn =
  _Fn |> implement(Functor) |> implement(Apply) |> implement(Chain);
