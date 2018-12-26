const { _ } = require("@masaeedu/infix");
const test = require("ava");

const { Fn, Int } = require("..");

const snap = t => x => t.snapshot(x);

test("functor", t => {
  _(Fn)(Fn.const(10))
    ["|>"](Fn.map(Int.add(1)))
    ["|>"](Fn.feed(undefined))
    ["|>"](snap(t))._;
});

test("applicative", t => {
  _(Fn)([Fn.of(20), Fn.of(22)])
    ["|>"](Fn.uncurry(Fn.lift2(Int.add)))
    ["|>"](Fn.feed(undefined))
    ["|>"](snap(t))._;
});
