const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const fs = require("fs");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const instances = require("./instances");
const Benchmark = require("benchmark");
const util = require("./util");
const mini = require("minimist");
const { BenchType } = util;

// TODO: Clean this up a bit

const main = () => {
  const args = mini(process.argv.slice(2));
  const mode = args._[0];
  const ns = parseArgs(args);
  switch (mode) {
    case "suite":
      runSpec(ns);
      break;
    case "single":
      runBenchmark(ns);
      break;
    case "list":
      console.log(JSON.stringify(instances));
      break;
    case "help":
      console.log(
        `
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
        `.trim()
      );
      break;
    default:
      runAll(ns["savePath"]);
  }
};

const parseArgs = args => {
  const _n = args._[1];
  const name = _n ? _n : args["name"] || args["n"];
  const _s = args._[2];
  const sizesStr = _s ? _s : args["sizes"] || args["s"];
  const sizes = sizesStr
    ? String(sizesStr)
        .split(",")
        .map(s => parseInt(s))
    : undefined;
  const savePath = args["save-to"];
  return { name, sizes, savePath };
};

const runAll = savePath => {
  const suites = instances.map(({ name, defaultSizes }) => {
    return runSpec({ name, sizes: defaultSizes });
  });
  if (savePath !== undefined) {
    saveMultiple(savePath, suites);
  }
};

const runSpec = ({ name, sizes: msizes, savePath }) => {
  const spec = expect(instances.find(x => x.name === name))(specNotFound(name));
  const suite = new Benchmark.Suite(name);
  const { benchmarks, defaultSizes } = spec;
  const sizes = msizes !== undefined ? msizes : defaultSizes;
  benchmarks.forEach(addBench(suite)(name)(sizes));
  suite.on("cycle", function(ev) {
    console.log(String(ev.target));
  });
  console.log(`Running spec ${spec.name}...`);
  suite.run();
  if (savePath !== undefined) {
    saveResult(savePath, suite);
  }
  return suite;
};

const runBenchmark = ({ name, sizes: msizes, savePath }) => {
  const [s, f] = name.split(".");
  const spec = expect(instances.find(x => x.name === s))(specNotFound(s));
  const bench = expect(spec.benchmarks.find(x => util.benchName(x) === f))(
    benchNotFound(s)(f)
  );
  const suite = new Benchmark.Suite(name);
  console.log(suite.name);
  const sizes = msizes !== undefined ? msizes : spec.defaultSizes;
  addBench(suite)(s)(sizes)(bench);
  suite.on("cycle", function(ev) {
    console.log(String(ev.target));
  });
  console.log(`Running benchmark ${name}...`);
  suite.run();
  if (savePath !== undefined) {
    saveResult(savePath, suite);
  }
};

const saveResult = (savePath, suite) => saveMultiple(savePath, [suite]);

const saveMultiple = async (savePath, suites) => {
  const commit = await exec("git rev-parse HEAD").then(x => x.stdout.trim());
  const branch = await exec("git symbolic-ref --short HEAD").then(x =>
    x.stdout.trim()
  );
  const version = await readFile("package.json").then(
    f => JSON.parse(f).version
  );
  const out = JSON.stringify({
    utctime: Date.now(),
    version,
    commit,
    branch,
    suites
  });
  await writeFile(savePath, out);
};

// TODO: Allow this to be configured via the CLI
const benchOpts = { maxTime: 1 };

const addBench = suite => name => sizes =>
  BenchType.match({
    Sized: addSized(suite)(name)(sizes),
    Unsized: addUnsized(suite)(name)
  });

const addSized = suite => name => sizes => ({ title, fn }) => {
  sizes.forEach(size => {
    suite.add(mkName(name)(title(size)), fn(size), benchOpts);
  });
};

const addUnsized = suite => name => ({ title, fn }) => {
  suite.add(mkName(name)(title), fn, benchOpts);
};

const availableSpecs = JSON.stringify(instances.map(i => i.name));

const specNotFound = name =>
  mkFail(
    `Benchmark Spec ${name} was not found.\nAvailable:\n` + availableSpecs
  );

const availableBenches = spec => {
  const s = expect(instances.find(i => i.name === spec))(specNotFound(spec));
  return JSON.stringify(s.benchmarks.map(b => util.benchName(b)));
};

const benchNotFound = spec => bench =>
  mkFail(
    `Benchmark ${spec}.${bench} was not found.\nAvailable:\n` +
      availableBenches(spec)
  );

const mkName = n => t => `${n}: ${t}`;

const mkFail = s => () => {
  console.log(s);
  process.exit(1);
};

const expect = v => f => {
  if (v === undefined) {
    f();
  } else {
    return v;
  }
};

main();
//saveResult("foo", "bar");
