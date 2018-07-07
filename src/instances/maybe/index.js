import { adt, _ } from "../../adt";
import { GenericEitherT } from "..";
import { Identity } from "../fnctr";

// ADT
const ADT = adt({ Nothing: [], Just: [_] });
const { Just, Nothing, match } = ADT;
const ADT_ = {
  Left: Nothing,
  Right: Just,
  match: ({ Left: Nothing, Right: Just }) => match({ Nothing, Just })
};
const generic = GenericEitherT(ADT_)(Identity);

export default { ...ADT, ...generic };
