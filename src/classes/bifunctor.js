const Fn = require("../instances/fn");

// Equivalent minimal definitions
const mdefs = (() => {
  const lmap = ({ bimap }) => f => bimap(f)(Fn.id);
  const rmap = ({ bimap }) => f => bimap(Fn.id)(f);
  const bimap = ({ lmap, rmap }) => l => r => x => x |> lmap(l) |> rmap(r);

  return [
    { impl: { lmap, rmap }, deps: ["bimap"] },
    { impl: { bimap }, deps: ["lmap", "rmap"] }
  ];
})();

// Class methods
const methods = ({ lmap, rmap, bimap }) => {
  return {};
};

module.exports = { mdefs, methods };
