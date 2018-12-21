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

const derive = Fn.pipe(
  Arr.map(implement)([
    Chain,
    Apply,
    Functor,
    Apply,
    Traversable,
    Foldable,
    Bifunctor
  ])
);

module.exports = { GenericEitherT: E => M => derive(GenericEitherT(E)(M)) };
