import chunkArray from "../../src/utils/chunkArray";

test("Split array [1,2,3,4] in 2 arrays", () => {
  expect(chunkArray([1, 2, 3, 4], 2)).toStrictEqual([
    [1, 2],
    [3, 4],
  ]);
});
