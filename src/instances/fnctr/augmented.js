const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const { Functor, Foldable, Traversable } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Fnctr = require(".");
const { Recurse } = Fnctr;

const classes = [Functor, Foldable, Traversable];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Fnctr: { ...Fnctr, Recurse: Ts => derive(Recurse(Ts)) } };
