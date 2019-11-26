require("@babel/register");
const {
  Obj,
  Arr,
  IntSum,
  Fnctr: { Identity }
} = require("../../src");
const util = require("../util");

const randomKey = s => String(Math.round(Math.random() * s)) + "key";

const makeObject = s => {
  let r = {};
  for (let x = 0; x < s; x++) {
    r[randomKey(s)] = Math.random();
  }
  return r;
};

const classes = util.mkSizedClasses(Obj)(makeObject)([
  util.functorFns,
  util.foldableFns,
  util.traversableFns,
  util.applyFns,
  util.semigroupFns
]);

const other = Arr.map(util.mkSized(makeObject))([
  ["mapWithKey", Obj.mapWithKey(util.fakeIntFn2)],
  ["foldMapWithKey", Obj.foldMapWithKey(IntSum)(util.fakeIntFn2)],
  ["pairs", Obj.pairs],
  ["traverseWithKey", Obj.traverseWithKey(Identity)(util.fakeIntFn2)],
  ["values", Obj.values],
  ["withKey", Obj.withKey],
  ["over", Obj.over(0)(util.fakeIntFn1)], // Fixme
  ["zipWith", v => Obj.zipWith(util.fakeIntFn2)(v)(v)],
  ["appendWith", v => Obj.appendWith(util.fakeIntFn2)(v)(v)]
]);

const makeFromPairs = s =>
  Array(s)
    .fill(0)
    .map(_ => [randomKey(s), Math.random()]);

const fromPairs = util.mkSized(makeFromPairs)(["fromPairs", Obj.fromPairs]);

module.exports = {
  name: "Obj",
  benchmarks: [...classes, ...other, fromPairs],
  defaultSizes: [100, 1000]
};
