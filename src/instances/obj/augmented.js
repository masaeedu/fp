const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Functor, Apply, Foldable, Traversable } = require("../../classes");

const Arr = require("../arr");
const Obj = require(".");

const classes = Arr.fold(ClassDef)([Functor, Apply, Foldable, Traversable]);

module.exports = { Obj: implement(classes)(Obj) };
