require("@babel/register");
const { IntSum, Identity, Arr } = require("../src");
const { adt } = require("@masaeedu/adt");

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

// type Bench a
//   = Sized a
//   | Unsized

const BenchType = adt({ Sized: ["a"], Unsized: ["b"] });
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
  semigroupFns
};
