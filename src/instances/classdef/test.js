import test from "ava";
import ClassDef from ".";
import { implement } from "../../plumbing";

const cd1 = {
  mdefs: {
    a: [],
    b: []
  },
  methods: ({ a, b }) => ({
    c: () => a() + b()
  })
};

const cd2 = {
  mdefs: {
    d: [],
    e: []
  },
  methods: ({ d, e }) => ({
    f: () => d() + e()
  })
};

const cd1And2 = ClassDef.append(cd1)(cd2);

const fs1 = {
  a: () => "a",
  b: () => "b"
};

const fs2 = {
  d: () => "d",
  e: () => "e"
};

const impl1 = implement(cd1)(fs1);
const impl2 = implement(cd2)(fs2);
const impl1And2 = implement(cd1And2)({ ...fs1, ...fs2 });

test("monoid", t => {
  t.snapshot(cd1, "Class 1");
  t.snapshot(cd2, "Class 2");
  t.snapshot(cd1And2, "1 And 2 appended");
  ["a", "b", "c"].forEach(f => {
    t.is(impl1[f](), impl1And2[f]());
  });
  [("d", "e", "f")].forEach(f => {
    t.is(impl2[f](), impl1And2[f]());
  });
});
