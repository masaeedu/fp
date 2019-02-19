const Fn = require("../instances/fn");
const Arr = require("../instances/arr");

// :: type Category p = { id: p a a, compose: p b c -> p a b -> p a c }

// Equivalent minimal definitions
const mdefs = [];

// Class methods
const methods = C => {
  const { id, compose } = C;
  const _ = {};

  // :: type Compose p p1 p2 where
  // ::      Compose p (p b c) (p a b) = p a c

  // :: p1 -> p2 -> Compose p p1 p2
  _["<:"] = compose;

  // :: type Flip t a b = t b a

  // :: p1 -> p2 -> Flip Compose p p1 p2
  _[":>"] = Fn.flip(compose);

  // :: type Foldl r z xs where
  // ::      Foldl _ z '[]         = z
  // ::      Foldl r z '[x, ...xs] = r (Foldl r z xs) x

  // :: type LPipe p xs = Foldl (Compose p) (p a a) xs
  // :: xs -> LPipe p xs
  _[":[...]>"] = Arr.foldl(_[":>"])(id);

  // :: type RPipe p xs = Foldl (Flip Compose p) (p a a) xs
  // :: xs -> RPipe p xs
  _["<[...]:"] = Arr.foldl(_["<:"])(id);

  return _;
};

module.exports = { mdefs, methods };
