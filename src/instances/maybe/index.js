const { adt } = require("@masaeedu/adt");
const { GenericEitherT } = require("..");
const { Identity } = require("../fnctr");

// ADT
const ADT = adt({ Nothing: [], Just: ["a"] });
const { Just, Nothing, match } = ADT;
const ADT_ = {
  Left: _ => Nothing,
  Right: Just,
  match: ({ Left, Right }) => match({ Nothing: Left(), Just: Right })
};
const generic = GenericEitherT(ADT_)(Identity);

const monoid = M => {
  const empty = Just(M.empty);
  const append = match({
    Nothing: _ => Nothing,
    Just: x =>
      match({
        Nothing,
        Just: y => Just(M.append(x)(y))
      })
  });
  return { empty, append };
};

// Alternative
// :: Maybe a
const zero = Nothing;
// :: Maybe a -> Maybe a -> Maybe a
const alt = match({
  Nothing: my => my,
  Just: x => _ => Just(x)
});

// Misc

// :: a -> Maybe a -> a
const fromMaybe = a =>
  match({
    Just: x => x,
    Nothing: a
  });

module.exports = { ...ADT, ...generic, monoid, zero, alt, fromMaybe };
