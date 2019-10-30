require("@babel/register");
const {
  Obj,
  Arr,
  IntSum,
  Fnctr: { Identity }
} = require("../../src");
const util = require("../util");

const makeObject = s => {
  let r = {};
  for (let x = 0; x < s; x++) {
    r[String(Math.random() * s) + "ab"] = Math.random();
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
  ["mapWithKey", Obj.mapWithKey(_ => x => x + 1)],
  ["foldMapWithKey", Obj.foldMapWithKey(IntSum)(_ => x => x)],
  ["pairs", Obj.pairs],
  ["traverseWithKey", Obj.traverseWithKey(Identity)(_ => x => x + 1)],
  ["values", Obj.values],
  ["withKey", Obj.withKey],
  ["over", Obj.over(0)(x => x)],
  ["zipWith", v => Obj.zipWith(a => _ => a)(v)(v)],
  ["appendWith", v => Obj.appendWith(a => _ => a)(v)(v)]
]);

const makeFromPairs = s =>
  Array(s)
    .fill(0)
    .map((x, i) => [i, x]);

const fromPairs = util.mkSized(makeFromPairs)(["fromPairs", Obj.fromPairs]);

module.exports = {
  name: "Obj",
  benchmarks: [...classes, ...other, fromPairs],
  defaultSizes: [100, 1000]
};
