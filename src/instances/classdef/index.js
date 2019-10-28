const Obj = require("../obj/index");

const ClassDef = (() => {
  const append = a => b => {
    return {
      mdefs: Obj.append(a.mdefs)(b.mdefs),
      methods: M => Obj.append(a.methods(M))(b.methods(M))
    };
  };

  const empty = {
    mdefs: {},
    methods: () => {}
  };

  return {
    append,
    empty
  };
})();

module.exports = ClassDef;
