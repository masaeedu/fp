const { adt } = require("@masaeedu/adt");
const { GenericEitherT } = require("..");

// ADT
const ADT = adt({ Left: ["a"], Right: ["b"] });

// EitherT
const EitherT = M => ({ ...GenericEitherT(ADT)(M), ...ADT });

module.exports = EitherT;
