require("@babel/register");
const {
  IntSum,
  Fnctr: { Identity },
  Arr,
  Either
} = require("../src");
const { adt } = require("@masaeedu/adt");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const fs = require("fs");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const Benchmark = require("benchmark");

// type Sized a =
//   { name  :: String
//   , title :: Int -> String
//   , fn    :: a -> ()
//   }

// type Unsized =
//   { name  :: String
//   , title :: String
//   , fn    :: () -> ()
//   }

const BenchType = adt({ Sized: ["Sized a"], Unsized: ["Unsized"] });
const { Sized, Unsized } = BenchType;

const benchName = BenchType.match({
  Sized: ({ name }) => name,
  Unsized: ({ name }) => name
});

// Creates a Sized benchmark given a generator, a name,
// and a function to benchmark that accepts the output of the generator.
// :: (Int -> a) -> (String, a -> ()) -> Bench a
const mkSized = gen => ([name, func]) =>
  Sized({
    name,
    title: size => `${name} - ${size} elements`,
    fn: size => {
      const v = gen(size);
      return () => func(v);
    }
  });

// Creates an Unsized generator that runs the supplied function
// with no input.
// :: (String, () -> ()) -> Bench a
const mkUnsized = ([name, func]) =>
  Unsized({
    name,
    title: name,
    fn: func
  });

// Convenience function to create a list of sized benchmarks
// from the class method templates below.
// e.g. mkSizedClasses(Arr)([functorFns, foldableFns])
// :: Instance a -> (Int -> a) -> [Instance a -> [(String, a -> ())]]
const mkSizedClasses = m => gen => cs =>
  Arr.map(mkSized(gen))(Arr.foldMap(Arr)(c => c(m))(cs));

const functorFns = f => [
  ["map", f.map(x => x)],
  ["$>", fa => f["$>"](fa)(1)],
  ["<$", f["<$"](1)]
];

const foldableFns = f => [
  ["foldl", f.foldl(a => b => a + b)(0)],
  ["foldr", f.foldr(a => b => a + b)(0)],
  ["foldMap", f.foldMap(IntSum)(x => x)],
  ["fold", f.fold(IntSum)]
];

const traversableFns = f => [
  ["traverse", f.traverse(Identity)(x => x)],
  ["sequence", f.sequence(Identity)]
];

const applyFns = f => [
  ["lift2", fa => f.lift2(a => b => a)(fa)(fa)],
  ["*>", fa => f["*>"](fa)(fa)],
  ["<*", fa => f["<*"](fa)(fa)]
];

const applicativeFns = f => [["ap", f.ap(f.of(x => x))]];

const chainFns = f => [["chain", fa => f.chain(_ => fa)(fa)]];

const monadFns = f => [["join", fa => f.join(f.of(fa))]];

const semigroupFns = f => [["append", a => f.append(a)(a)]];

// Running Suites

// :: Suite -> BenchmarkJSSuite
const mkBenchmarkSuite = ({ name, benchmarks, defaultSizes }) => {
  const suite = new Benchmark.Suite(name);
  benchmarks.forEach(addBench(suite)(name)(defaultSizes));
  suite.on("cycle", ev => console.log(String(ev.target)));
  return suite;
};

const findSuiteOrDie = suites => name =>
  expect(suites.find(s => s.name === name))(suiteNotFound(name)(suites));

const findBenchmarkOrDie = suite => name =>
  expect(suite.benchmarks.find(b => benchName(b) === name))(
    benchmarkNotFound(name)(suite)
  );

const saveResults = async (savePath, suites) => {
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

// Benchmark.js config for individual benchmarks
// TODO: Allow config via CLI
const benchOpts = {
  maxTime: 1
};

// Adding benchmarks to benchmark.js suites
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

const mkName = name => title => `${name}: ${title}`;

// Error messages

const suiteNotFound = name => suites =>
  mkFail(
    `
Suite ${name} was not found.
Available:
${Arr.foldMap(Str)(x => " - " + x.name + "\n")(suites)}
    `.trim()
  );

const benchmarkNotFound = name => suite =>
  mkFail(
    `
Benchmark ${suite.name}.${name} was not found.
Available:
${Arr.foldMap(Str)(x => ` - ${suite.name}.${benchName(x)}\n`)(suite.benchmarks)}
      `.trim()
  );

// Misc

const Str = { append: a => b => a + b, empty: "" };

const mkFail = s => () => {
  console.log(s);
  process.exit(1);
};

const expect = v => f => {
  if (v === undefined) {
    console.log("HERE");
    f();
  } else {
    return v;
  }
};

// :: String -> Either String Int
const parseIntE = s => {
  const parsed = parseInt(s);
  if (isNaN(parsed)) {
    return Either.Left(`${s} is not a number`);
  } else {
    return Either.Right(parsed);
  }
};

const splitStr = d => s => s.split(d);

module.exports = {
  BenchType,
  benchName,
  mkSized,
  mkUnsized,
  mkSizedClasses,
  functorFns,
  foldableFns,
  traversableFns,
  applyFns,
  applicativeFns,
  chainFns,
  monadFns,
  semigroupFns,
  findBenchmarkOrDie,
  findSuiteOrDie,
  mkBenchmarkSuite,
  saveResults,
  Str,
  parseIntE,
  splitStr
};
