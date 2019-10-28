import test from "ava";
import { implement } from ".";
import { Obj } from "..";

const mdefs = (() => {
  const fooFromBar = ({ bar }) => () => `foo from ${bar()}`;
  const fooFromBaz = ({ baz }) => () => `foo from ${baz()}`;
  const barFromFoo = ({ foo }) => () => `bar from ${foo()}`;
  const barFromBaz = ({ baz }) => () => `bar from ${baz()}`;
  const bazFromFoo = ({ foo }) => () => `baz from ${foo()}`;
  const bazFromBar = ({ bar }) => () => `baz from ${bar()}`;

  return [
    { impl: { foo: fooFromBar }, deps: ["bar"] },
    { impl: { foo: fooFromBaz }, deps: ["baz"] },
    { impl: { bar: barFromFoo }, deps: ["foo"] },
    { impl: { bar: barFromBaz }, deps: ["baz"] },
    { impl: { baz: bazFromFoo }, deps: ["foo"] },
    { impl: { baz: bazFromBar }, deps: ["bar"] }
  ];
})();

const fromFoo = { foo: () => "OG Foo" };
const fromBar = { bar: () => "OG Bar" };
const fromBaz = { baz: () => "OG Baz" };
const fooAndBaz = { ...fromFoo, ...fromBaz };
const fooBarBaz = { ...fromBaz, ...fromFoo, ...fromBar };

const methods = () => {};

const Foo = implement({ mdefs, methods })(fromFoo);
const Bar = implement({ mdefs, methods })(fromBar);
const Baz = implement({ mdefs, methods })(fromBaz);
const FooBaz = implement({ mdefs, methods })(fooAndBaz);
const FooBarBaz = implement({ mdefs, methods })(fooBarBaz);

Obj.mapWithKey(n => m => {
  test(`Derivation for ${n}`, t => {
    t.snapshot(m.foo(), "foo");
    t.snapshot(m.bar(), "bar");
    t.snapshot(m.baz(), "baz");
  });
})({ Foo, Bar, Baz, FooBaz, FooBarBaz });
