import { adt, _ } from "../../adt";
import { GenericEitherT } from "..";
import { Identity } from "../fnctr";

// ADT
const ADT = adt({ Left: [_], Right: [_] });
const generic = GenericEitherT(ADT)(Identity);

export default { ...ADT, ...generic };
