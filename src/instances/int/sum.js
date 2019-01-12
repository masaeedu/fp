const { add } = require(".");

// Monoid
const empty = 0;
const append = add;

module.exports = { empty, append };
