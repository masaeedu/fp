const prefixLen = "[object ".length;
export const typeid = x => {
  // Object#toString("foo") = "[object String]"
  const protoString = Object.prototype.toString.call(x);
  return protoString.substr(prefixLen, protoString.length - prefixLen - 1);
};
