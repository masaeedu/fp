import test from "ava";
import { implement } from ".";
import { Obj } from "..";

const methods = () => {};

const mdefs = (() => {
  const fooFromBar = ({ bar }) => () => `foo from ${bar()}`;
  const fooFromBaz = ({ baz }) => () => `foo from ${baz()}`;
  const barFromFoo = ({ foo }) => () => `bar from ${foo()}`;
  const barFromBaz = ({ baz }) => () => `bar from ${baz()}`;
  const bazFromFoo = ({ foo }) => () => `baz from ${foo()}`;
  const bazFromBar = ({ bar }) => () => `baz from ${bar()}`;

  return {
    foo: [{ deps: ["bar"], fn: fooFromBar }, { deps: ["baz"], fn: fooFromBaz }],
    bar: [{ deps: ["foo"], fn: barFromFoo }, { deps: ["baz"], fn: barFromBaz }],
    baz: [{ deps: ["foo"], fn: bazFromFoo }, { deps: ["bar"], fn: bazFromBar }]
  };
})();

const fromFoo = { foo: () => "OG Foo" };
const fromBar = { bar: () => "OG Bar" };
const fromBaz = { baz: () => "OG Baz" };

const Foo = implement({ mdefs, methods })(fromFoo);
const Bar = implement({ mdefs, methods })(fromBar);
const Baz = implement({ mdefs, methods })(fromBaz);

Obj.mapWithKey(n => m => {
  test(`Derivation for ${n}`, t => {
    t.snapshot(m.foo(), "foo");
    t.snapshot(m.bar(), "bar");
    t.snapshot(m.baz(), "baz");
  });
})({ Foo, Bar, Baz });
