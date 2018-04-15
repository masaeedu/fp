// Equivalent minimal definitions
export const mdefs = (() => {
  const map = ({ of, chain }) => f => chain(v => f(v) |> of);

  return [{ impl: { map }, deps: ["of", "chain"] }];
})();

// Class methods
export const methods = ({ map }) => {
  return {};
};
