import { Assert, Test, TestFailed, Length, UnionType, Join, Split } from "src";


it("test IfFunction", () => {

  type S = [
    "a",
    "b",
    "c",
  ];

  type _1 = Assert<[
    Test<UnionType<S>, "a" | "b" | "c">,
    Test<Join<"", S>, "abc">,
    Test<Join<"#", S>, "a#b#c">,
    TestFailed<Join<"#", S>, "ab#c">,
  ]>;

});


it("test IfGreater/IfLess", () => {

  type _1 = Assert<[
    Test<Split<"#", "a#b#c">, ["a", "b", "c"]>,
    TestFailed<Split<"#", "a#b#c">, ["b", "a", "c"]>,
    Test<Split<"a", "a#b#c">, ["", "#b#c"]>,
  ]>;

});


it("test IfGreater/IfLess", () => {

  type _1 = Assert<[
    Test<Length<[]>, 0>,
    Test<Length<["a"]>, 1>,
    Test<Length<["a", "b"]>, 2>,
    Test<Length<["a", "b", "c"]>, 3>,
  ]>;

});
