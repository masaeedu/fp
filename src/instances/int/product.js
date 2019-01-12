const { mul } = require(".");

// Monoid
const empty = 1;
const append = mul;

module.exports = { empty, append };
