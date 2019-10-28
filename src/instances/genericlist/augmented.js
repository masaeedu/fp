const { _ } = require("@masaeedu/infix");

const { implement } = require("../../plumbing");
const {
  Chain,
  Apply,
  Functor,
  Traversable,
  Foldable,
  Bifunctor
} = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const GenericList = require(".");

const classes = [Functor, Apply, Chain, Traversable, Foldable];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { GenericList: L => derive(GenericList(L)) };
