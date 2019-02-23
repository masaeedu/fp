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
const GenericEitherT = require(".");

const classes = [Chain, Apply, Functor, Apply, Bifunctor];
const derive = _(Fn)(classes)
  ["|>"](Arr.map(implement))
  ["|>"](Fn.pipe)._;

module.exports = { GenericEitherT: E => M => derive(GenericEitherT(E)(M)) };
