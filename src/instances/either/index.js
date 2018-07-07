import { adt, _ } from "../../adt";
import GenericEither from "../generic/either";

// ADT
const ADT = adt({ Left: [_], Right: [_] });
const generic = GenericEither(ADT);

export default { ...ADT, ...generic };
