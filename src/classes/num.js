const Fn = require("../instances/fn");

// Equivalent minimal definitions
const mdefs = [];

// Class methods
const methods = N => {
  const _ = {};

  _["+"] = N.add;
  _["*"] = N.mul;
  _["-"] = N.sub;
  _["/"] = N.div;

  return _;
};

module.exports = { mdefs, methods };
