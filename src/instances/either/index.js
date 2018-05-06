import { adt, _ } from "../../adt";
import GenericEither from "../generic/either";

import * as Obj from "../obj";
import * as Fn from "../fn";

// ADT
const ADT = adt({ Left: [_], Right: [_] });

// Free stuff:
// - Constructors
// - match
// - Monad (=> Functor, Apply)
// - Traversable (=> Foldable)
// - Bifunctor
export const { Left, Right, is, match } = ADT;
export const { of, chain, traverse, bimap } = GenericEither(ADT);

// Misc
export const either = bimap;
