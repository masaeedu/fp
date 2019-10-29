const util = require("./util");
const analysis = require("./analysis");
const mini = require("minimist");
const fs = require("fs");
const { adt } = require("@masaeedu/adt");
const { Obj, Maybe, Either, Arr, Fn } = require("../src");
const { Just, Nothing } = Maybe;
const { Left, Right } = Either;

const Command = adt({
  RunAll: ["Maybe Path"],
  RunSuite: ["String", "Maybe [Int]", "Maybe Path"],
  RunSingle: ["String", "Maybe [Int]", "Maybe Path"],
  List: ["()"],
  Help: ["()"],
  Summary: ["Path"],
  Compare: ["Path", "Path"]
});

const { RunAll, RunSuite, RunSingle, List, Help, Summary, Compare } = Command;

const parseCommand = pargv => {
  const args = mini(pargv.slice(2));

  const parsedArgs = (() => {
    const named = Obj.map(k => {
      const r = Obj.get(k)(args);
      return r ? Just(String(r)) : Nothing;
    })(Obj.mirror(["save-to", "name", "sizes"]));

    const positional = {
      name: args._[1] ? Just(args._[1]) : Nothing,
      sizes: args._[2] ? Just(String(args._[2])) : Nothing
    };

    return Obj.appendWith(Maybe.alt)(named)(positional);
  })();

  const parseSaveTo = Right(parsedArgs["save-to"]);

  const parseName = Maybe.match({
    Just: Right,
    Nothing: Left("Missing name argument")
  })(parsedArgs.name);

  const parseSingleName = Either.chain(x => {
    const [a, b] = x.split(".");
    return a && b ? Right([a, b]) : Left(`invalid benchmark path ${x}`);
  })(parseName);

  const parseSizes = Maybe.traverse(Either)(
    Fn.pipe([util.splitStr(","), Arr.traverse(Either)(util.parseIntE)])
  )(parsedArgs.sizes);

  const parseStr = n =>
    args._[n] ? Right(args._[n]) : Left(`Missing position argument at ${n}`);

  const runAll = Either.map(RunAll)(parseSaveTo);

  switch (args._[0]) {
    case "all":
      return runAll;
    case "suite":
      return Either.liftN(RunSuite)([parseName, parseSizes, parseSaveTo]);
    case "single":
      return Either.liftN(RunSingle)([
        parseSingleName,
        parseSizes,
        parseSaveTo
      ]);
    case "list":
      return Right(List());
    case "help":
      return Right(Help());
    case "summary":
      return Either.map(Summary)(parseStr(1));
    case "compare":
      return Either.lift2(Compare)(parseStr(1))(parseStr(2));
    case undefined:
      return runAll;
    default:
      return Left("Unknown mode " + args._[0]);
  }
};

const maybeSaveResults = suites =>
  Maybe.match({
    Just: p => util.saveResults(p, suites),
    Nothing
  });

const execRunAll = instances => savePath => {
  const suites = Arr.map(util.mkBenchmarkSuite)(instances);
  console.log("Running all suites...");
  suites.forEach(s => s.run());
  maybeSaveResults(suites)(savePath);
};

const execRunSuite = instances => name => sizes => savePath => {
  const x = util.findSuiteOrDie(instances)(name);
  const defaultSizes = Maybe.fromMaybe(x.defaultSizes)(sizes);
  const suite = util.mkBenchmarkSuite({
    ...x,
    defaultSizes
  });
  console.log(`Running suite ${name}...`);
  suite.run();
  maybeSaveResults([suite])(savePath);
};

const execRunSingle = instances => ([sname, bname]) => sizes => savePath => {
  const sx = util.findSuiteOrDie(instances)(sname);
  const x = util.findBenchmarkOrDie(sx)(bname);
  const suite = util.mkBenchmarkSuite({
    name: `${sname}.${bname}`,
    benchmarks: [x],
    defaultSizes: Maybe.fromMaybe(sx.defaultSizes)(sizes)
  });
  suite.run();
  maybeSaveResults([suite])(savePath);
};

const execSummary = path => {
  const res = JSON.parse(fs.readFileSync(path));
  console.dir(analysis.summary(res), { depth: Infinity });
};

const execCompare = p1 => p2 => {
  const r1 = JSON.parse(fs.readFileSync(p1));
  const r2 = JSON.parse(fs.readFileSync(p2));
  console.dir(analysis.compare(r1)(r2), { depth: Infinity });
};

const helpMessage = `
Usage: bench.js <COMMAND> <ARGS>
Available commands:
  suite    Run all of the benchmarks in a suite, e.g. spec Arr
  single   Run a single benchmark from a suite, e.g. single Arr.foldr
  all      (default) Run all available specs with their default sizes
  list     List available benchmarks
  help     Display this help text
Args (can be specified as <name> <sizes> without the flags):
  --sizes   Comma separated list of sizes to run each sizeable benchmark with, 
            e.g. 10,100,1000
  --name    The name of a spec/benchmark to run
  --save-to Serialize the raw benchmark.js results to the provided path along 
            with the current datetime, library version and commit id
Examples:
  bench.js single Arr.foldr 10,20,30
  bench.js single --name Arr.foldr --sizes 10,20,30
  bench.js spec Arr
`.trim();

const runCommand = instances =>
  Command.match({
    RunAll: execRunAll(instances),
    RunSuite: execRunSuite(instances),
    RunSingle: execRunSingle(instances),
    Summary: execSummary,
    Compare: execCompare,
    List: () => console.log(JSON.stringify(instances)),
    Help: () => console.log(helpMessage)
  });

module.exports = {
  parseCommand,
  runCommand,
  helpMessage
};
