const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const {
  Functor,
  Apply,
  Chain,
  Foldable,
  Traversable
} = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Iter = require(".");

const classes = [Functor, Apply, Chain, Traversable, Foldable];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { Iter: derive(Iter) };
