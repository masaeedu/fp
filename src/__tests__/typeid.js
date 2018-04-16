import test from "ava";
import { typeid } from "../plumbing/typeid";

test("typeid", t => {
  const inputs = [{}, [], "", 10, Promise.resolve(10), undefined, null];
  for (const i of inputs) {
    t.snapshot(typeid(i));
  }
});
