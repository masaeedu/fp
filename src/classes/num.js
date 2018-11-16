import * as Fn from "../instances/fn";

// Equivalent minimal definitions
export const mdefs = [];

// Class methods
export const methods = N => {
  const _ = {};

  _["+"] = N.add;
  _["*"] = N.mul;
  _["-"] = N.sub;
  _["/"] = N.div;

  return _;
};
