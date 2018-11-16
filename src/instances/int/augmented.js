import { implement } from "../../plumbing";
import { Num } from "../../classes";

import * as _Int from ".";
import * as _IntProduct from "./product";
import * as _IntSum from "./sum";

export const Int = _Int |> implement(Num);
export const IntProduct = _IntProduct;
export const IntSum = _IntSum;
