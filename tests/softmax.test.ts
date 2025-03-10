import { softmax } from "../src/lib/softmax";

const OCCURENCES = {
  a: 5,
  b: 10,
  c: 15,
  d: 10,
  e: 5,
};

describe("softmax", () => {
  it("calculates correct at low temperature", () => {
    expect(softmax(OCCURENCES, 1)).toMatchObject({
      a: 0.000044792247059431263,
      b: 0.006647758889393291,
      c: 0.9866148977270944,
      d: 0.006647758889393291,
      e: 0.000044792247059431263,
    })
  });

  it("calculates correct at high temperature", () => {
    expect(softmax(OCCURENCES, 50)).toMatchObject({
      a: 0.1841029125425514,
      b: 0.2034651848750522,
      c: 0.22486380516479282,
      d: 0.2034651848750522,
      e: 0.1841029125425514,
    });
  });
});
