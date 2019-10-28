const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Functor, Apply, Chain, Category } = require("../../classes");

const Fn = require(".");
const Arr = require("../arr");

const classes = Arr.fold(ClassDef)([Functor, Apply, Chain, Category]);

module.exports = { Fn: implement(classes)(Fn) };
