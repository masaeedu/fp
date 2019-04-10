const test = require("ava");

const { Fn, Arr, Maybe, Kleisli, cata } = require("..");

const { Just, Nothing } = Maybe;

const snap = t => x => t.snapshot(x);

// Get a property from an object if it has it
// :: k -> ({ [k]: v } | _) -> Maybe v
const get = k => v => (v.hasOwnProperty(k) ? Just(v[k]) : Nothing);

// Given an array of length 1, get the only item inside it, otherwise Nothing
// :: ('[x] | _) -> Maybe x
const only = xs => (Arr.is(xs) && xs.length === 1 ? Just(xs[0]) : Nothing);

test("can pipe maybes", t => {
  // Given some key, get the only item inside the array present at that key, otherwise Nothing
  // :: k -> ({ [k]: ('[v] | _) } | _) -> Maybe v
  const access = k => Fn.pipe([get(k), Maybe.chain(only)]);

  // Given a list of keys, access your way through them
  const path = Fn.pipe([Arr.map(access), Kleisli(Maybe).pipe]);

  const input = { foo: [{ bar: [{ baz: [1] }], quux: [] }] };
  const paths = [["foo", "bar", "baz"], ["foo", "quux"], ["flub"]];

  const output = Arr.map(p => path(p)(input))(paths);

  snap(t)(output);
});
