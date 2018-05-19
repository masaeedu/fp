import * as _Transformers from "./transformers";
export const Transformers = _Transformers;

export const MonoidalApplicative = M => A => {
  const empty = A.pure(M.empty);
  const append = A.lift2(M.append);

  return { empty, append };
};
