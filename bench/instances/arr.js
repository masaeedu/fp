require("@babel/register");
const { Arr } = require("../../src");
const util = require("../util");

const makeArray = s =>
  Array(s)
    .fill(1)
    .map(_ => Math.random());

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
  ["filter", Arr.filter(util.fakeIntPred)],
  ["intersect", as => Arr.intersect(as)(as)],
  ["zipWith", as => Arr.zipWith(util.fakeIntFn2)(as)(as)],
  ["mapWithKey", Arr.mapWithKey(util.fakeIntFn2)],
  ["scanl", Arr.scanl(util.fakeIntFn2)(0)],
  ["scanl1", Arr.scanl1(util.fakeIntFn2)],
  ["scanr", Arr.scanr(util.fakeIntFn2)(0)],
  ["scanr1", Arr.scanr1(util.fakeIntFn2)],
  ["append", as => Arr.append(as)(as)]
]);

// TODO: dedupe, replicate, groupBy

module.exports = {
  name: "Arr",
  benchmarks: [...classes, ...quadratics, ...other],
  defaultSizes: [1000, 10000]
};
