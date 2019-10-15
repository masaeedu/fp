require("@babel/register");
const { Arr, IntSum, Identity } = require("../../src");
const util = require("../util");

const makeArray = s => Array(s).fill(1);

const makeArraySqrt = s => Array(Math.ceil(Math.sqrt(s))).fill(1);

const classes = util.mkSizedClasses(Arr)(makeArray)([
  util.functorFns,
  util.foldableFns,
  util.traversableFns,
  util.semigroupFns,
  util.applicativeFns
]);

// These produce arrays of the supplied size
const quadratics = util.mkSizedClasses(Arr)(makeArraySqrt)([
  util.chainFns,
  util.applyFns
]);

const other = Arr.map(util.mkSized(makeArray))([
  ["filter", Arr.filter(x => true)],
  ["intersect", as => Arr.intersect(as)(as)],
  ["zipWith", as => Arr.zipWith(a => b => a)(as)(as)],
  ["mapWithKey", Arr.mapWithKey(_ => a => a)],
  ["scanl", Arr.scanl(a => b => a + b)(0)],
  ["scanl1", Arr.scanl(a => b => a + b)],
  ["scanr", Arr.scanr(a => b => a + b)(0)],
  ["scanr1", Arr.scanr1(a => b => a + b)],
  ["append", as => Arr.append(as)(as)]
]);

// TODO: dedupe, replicate, groupBy

module.exports = {
  name: "Arr",
  benchmarks: [...classes, ...quadratics, ...other],
  defaultSizes: [1000, 10000]
};
