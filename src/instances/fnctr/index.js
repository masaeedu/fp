const { match, otherwise } = require("natch");

const Fn = require("../fn");
const Obj = require("../obj");
const Arr = require("../arr");

const { type } = require("../../plumbing");

// Misc
const Identity = {
  of: Fn.id,
  map: Fn.id,
  lift2: Fn.id,
  chain: Fn.id
};

const Const = {
  map: Fn.const(Fn.id)
};

const MonoidConst = M => ({
  map: Const.map,
  of: Fn.const(M.empty),
  lift2: Fn.const(M.append)
});

const Recurse = Ts => {
  const isCases = [...Arr.map(T => [T, true])(Ts), [otherwise, false]];
  const is = match(type(Ts), ...isCases);

  const map = f => {
    const recurse = F => [F, x => F.map(map(f))(x)];
    const cases = [...Arr.map(recurse)(Ts), [otherwise, f]];

    return match(type(Ts), ...cases);
  };

  const foldMap = M => f => {
    const recurse = F => [F, x => F.foldMap(M)(foldMap(M)(f))(x)];
    const cases = [...Arr.map(recurse)(Ts), [otherwise, f]];

    return match(type(Ts), ...cases);
  };

  const traverse = A => f => {
    const recurse = T => [T, x => T.traverse(A)(traverse(A)(f))(x)];
    const cases = [...Arr.map(recurse)(Ts), [otherwise, f]];

    return match(type(Ts), ...cases);
  };

  return { is, map, foldMap, traverse };
};

// Category
const id = Identity;
const compose = Obj.zipWith(Fn.compose);

module.exports = {
  Identity,
  Const,
  MonoidConst,
  Recurse,
  id,
  compose
};
