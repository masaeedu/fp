const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Category } = require("../../classes");

const Arr = require("../arr");
const Kleisli = require(".");

const classes = Arr.fold(ClassDef)([Category]);

module.exports = { Kleisli: M => implement(classes)(Kleisli(M)) };
