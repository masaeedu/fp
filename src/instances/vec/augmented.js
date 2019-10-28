const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Functor, Apply } = require("../../classes");

const Arr = require("../arr");
const Vec = require(".");

const classes = Arr.fold(ClassDef)([Functor, Apply]);

module.exports = { Vec: n => implement(classes)(Vec(n)) };
