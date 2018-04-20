import * as Fn from "../fn";

// Functor
import { map } from "./const";

export default M => {
  // Applicative
  const of = Fn.const(M.empty);
  const lift2 = Fn.const(M.append);

  return { map, of, lift2 };
};
