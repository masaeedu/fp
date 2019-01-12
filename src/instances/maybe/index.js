const { adt } = require("@masaeedu/adt");
const { GenericEitherT } = require("..");
const { Identity } = require("../fnctr");

// ADT
const ADT = adt({ Nothing: [], Just: ["a"] });
const { Just, Nothing, match } = ADT;
const ADT_ = {
  Left: _ => Nothing,
  Right: Just,
  match: ({ Left, Right }) => match({ Nothing: Left(), Just: Right })
};
const generic = GenericEitherT(ADT_)(Identity);

module.exports = { ...ADT, ...generic };
