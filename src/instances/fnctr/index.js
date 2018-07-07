import { match, otherwise } from "natch";

import * as Fn from "../fn";
import * as Obj from "../obj";
import * as Arr from "../arr";
import { type, implement } from "../../plumbing";
import { Functor, Foldable, Traversable } from "../../classes";

// Misc
export const Identity = {
  of: Fn.id,
  map: Fn.id,
  lift2: Fn.id,
  chain: Fn.id
};

export const Const = {
  map: Fn.const(Fn.id)
};

export const MonoidConst = M => ({
  map: Const.map,
  of: Fn.const(M.empty),
  lift2: Fn.const(M.append)
});

export const Recurse = Ts => {
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

  return (
    { is, map, foldMap, traverse }
    |> implement(Functor)
    |> implement(Foldable)
    |> implement(Traversable)
  );
};

// Category
export const id = Identity;
export const compose = Obj.zipWith(Fn.compose);
