# Benchmarking Utility

## CLI

The benchmarking CLI has four main modes of operation:

1) Run all: `yarn bench` or `yarn bench all`
2) Run a specific suite: `yarn bench suite Arr`
3) Run a specific benchmark: `yarn bench single Arr.foldr`
4) List available suites and their benchmarks (JSON format): `yarn bench list`

The `suite` and `single` modes support a `--sizes` option, which accepts a comma-separated list of values (e.g. `10,20,30`) as an arugment. Sized benchmarks will run once with each of the provided sizes, overriding the default sizes specified in the suite:

```
$ yarn bench single Arr.foldr --sizes 10,100,1000
Running benchmark Arr.foldr
Arr: foldr - 10 elements [...]
Arr: foldr - 100 elements [...]
Arr: foldr - 1000 elements [...]
```

The [benchmark.js](https://github.com/bestiejs/benchmark.js/) results for any of the modes can be saved in JSON format by using the `--save-to` option followed by a file path.  The output file will also contain the UTC time, current commit SHA, current branch, and `package.json` version.

## Adding Benchmarks

A benchmark is either sized or unsized.  See `./util.js` for more information.

A suite is an object:
```purescript
type Suite a = 
  { name         :: String,
  , benchmarks   :: [Bench a],
  , defaultSizes :: [Int]
  }
```
See the exports of `./instances/arr.js` and `./instances/obj.js` for examples.

Any suite added to the list exported from `./instances/index.js` will be available on the CLI.
