const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const {
  Functor,
  Apply,
  Chain,
  Foldable,
  Traversable
} = require("../../classes");

const Arr = require("../arr");
const Iter = require(".");

const classes = Arr.fold(ClassDef)([
  Functor,
  Apply,
  Chain,
  Traversable,
  Foldable
]);

module.exports = { Iter: implement(classes)(Iter) };
