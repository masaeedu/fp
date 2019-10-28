const Fn = require("../instances/fn");

// Equivalent minimal definitions
const mdefs = (() => {
  const lmap = ({ bimap }) => f => bimap(f)(Fn.id);
  const rmap = ({ bimap }) => f => bimap(Fn.id)(f);
  const bimap = ({ lmap, rmap }) => l => r => x => x |> lmap(l) |> rmap(r);

  return {
    lmap: [{ deps: ["bimap"], fn: lmap }],
    rmap: [{ deps: ["bimap"], fn: rmap }],
    bimap: [{ deps: ["rmap", "lmap"], fn: bimap }]
  };
})();

// Class methods
const methods = ({ lmap, rmap, bimap }) => {
  return {};
};

module.exports = { mdefs, methods };
