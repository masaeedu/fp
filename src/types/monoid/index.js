// Dual of a monoid instance (reverses append)
const dual = ({ empty, append }) => ({ empty, append: Fn.flip(append) });
