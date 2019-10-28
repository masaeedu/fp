const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const {
  Chain,
  Apply,
  Functor,
  Foldable,
  Traversable,
  Bifunctor
} = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const GenericEitherT = require(".");

const classes = Arr.fold(ClassDef)([
  Functor,
  Apply,
  Chain,
  Bifunctor,
  Foldable,
  Traversable
]);

module.exports = {
  GenericEitherT: E => M => implement(classes)(GenericEitherT(E)(M))
};
