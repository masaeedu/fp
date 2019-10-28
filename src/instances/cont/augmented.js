const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Functor, Apply, Chain } = require("../../classes");

const Arr = require("../arr");
const Cont = require(".");

const classes = Arr.fold(ClassDef)([Functor, Apply, Chain]);

const Par_ = implement(Apply)(Cont.Par);
const Cont_ = { ...implement(classes)(Cont), Par: Par_ };

module.exports = { Cont: Cont_ };
