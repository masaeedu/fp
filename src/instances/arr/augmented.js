const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const {
  Functor,
  Foldable,
  Apply,
  Chain,
  Traversable
} = require("../../classes");

const Fn = require("../fn");
const Arr = require(".");

const classes = [Functor, Apply, Chain, Foldable, Traversable];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Arr: derive(Arr) };
