const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Chain, Apply, Functor } = require("../../classes");

const Arr = require("../arr");
const { Identity } = require("../fnctr");
const StateT_ = require(".");

const classes = Arr.fold(ClassDef)([Functor, Apply, Chain]);

const StateT = M => implement(classes)(StateT_(M));
const State = StateT(Identity);
module.exports = { StateT, State };
