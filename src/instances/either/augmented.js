const EitherT = require(".");
const { Identity } = require("../fnctr");

const Either = EitherT(Identity);
module.exports = { EitherT, Either };
