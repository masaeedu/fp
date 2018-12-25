const { adt } = require("@masaeedu/adt");

const { GenericEitherT } = require("..");
const { Identity } = require("../fnctr");

// ADT
const ADT = adt({ Left: ["a"], Right: ["b"] });
const generic = GenericEitherT(ADT)(Identity);

module.exports = { ...ADT, ...generic };
