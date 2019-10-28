const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Functor, Foldable, Traversable } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Fnctr = require(".");
const { Recurse } = Fnctr;

const classes = Arr.fold(ClassDef)([Functor, Foldable, Traversable]);

module.exports = {
  Fnctr: { ...Fnctr, Recurse: Ts => implement(classes)(Recurse(Ts)) }
};
