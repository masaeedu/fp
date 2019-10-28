const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const {
  Functor,
  Foldable,
  Apply,
  Chain,
  Traversable
} = require("../../classes");

const Arr = require(".");

const classes = Arr.fold(ClassDef)([
  Functor,
  Apply,
  Chain,
  Foldable,
  Traversable
]);

module.exports = { Arr: implement(classes)(Arr) };
