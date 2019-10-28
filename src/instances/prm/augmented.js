const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Chain, Apply, Functor } = require("../../classes");

const Fn = require("../fn");
const Arr = require("../arr");
const Prm = require(".");

const classes = Arr.fold(ClassDef)([Functor, Apply, Chain]);

module.exports = { Prm: implement(classes)(Prm) };
