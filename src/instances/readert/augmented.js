const { implement } = require("../../plumbing");
const ClassDef = require("../classdef");
const { Chain, Apply, Functor } = require("../../classes");

const Arr = require("../arr");
const { Identity } = require("../fnctr");
const ReaderT_ = require(".");

const classes = Arr.fold(ClassDef)([Functor, Apply, Chain]);

const ReaderT = M => implement(classes)(ReaderT_(M));
const Reader = ReaderT(Identity);
module.exports = { ReaderT, Reader };
