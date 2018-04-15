import { Fn } from ".";

// Misc
export const Identity = {
  of: Fn.id,
  map: Fn.id,
  lift2: Fn.id
};

export const Const = {
  map: Fn.const(Fn.id)
};

export const MonoidConst = M => ({
  map: Const.map,
  of: Fn.const(M.empty),
  lift2: Fn.const(M.append)
});
