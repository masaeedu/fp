export const lazy = t =>
  new Proxy(() => {}, {
    apply: (_, this_, args) => t().apply(this_, args)
  });
