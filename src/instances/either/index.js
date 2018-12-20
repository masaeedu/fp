import { adt } from "@masaeedu/adt";
import { GenericEitherT } from "..";
import { Identity } from "../fnctr";

// ADT
const ADT = adt({ Left: ["a"], Right: ["b"] });
const generic = GenericEitherT(ADT)(Identity);

export default { ...ADT, ...generic };
