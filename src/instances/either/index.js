import { adt, _ } from "../../adt";
import GenericEither from "../generic/either";

// ADT
const ADT = adt({ Left: [_], Right: [_] });
const generic = GenericEither(ADT);

// Misc
const either = generic.bimap;

export default { ...ADT, ...generic, either };
