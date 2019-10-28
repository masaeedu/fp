const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const {
  Chain,
  Apply,
  Functor,
  Traversable,
  Foldable
} = require("../../classes");

const Arr = require("../arr");
const GenericList = require(".");

const classes = Arr.fold(ClassDef)([
  Functor,
  Apply,
  Chain,
  Traversable,
  Foldable
]);

module.exports = { GenericList: L => implement(classes)(GenericList(L)) };
