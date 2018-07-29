import { adt, _ } from "../../adt";
import { GenericEitherT } from "..";
import { Identity } from "../fnctr";

// ADT
const ADT = adt({ Nothing: [], Just: [_] });
const { Just, Nothing, match } = ADT;
const ADT_ = {
  Left: _ => Nothing,
  Right: Just,
  match: ({ Left, Right }) => match({ Nothing: Left(), Just: Right })
};
const generic = GenericEitherT(ADT_)(Identity);

module.exports = { ...ADT, ...generic };
