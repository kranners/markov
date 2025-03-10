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
      a: expect.closeTo(0.000044792247059431263),
      b: expect.closeTo(0.006647758889393291),
      c: expect.closeTo(0.9866148977270944),
      d: expect.closeTo(0.006647758889393291),
      e: expect.closeTo(0.000044792247059431263),
    })
  });

  it("calculates correct at high temperature", () => {
    expect(softmax(OCCURENCES, 5)).not.toMatchObject({
      a: expect.closeTo(0.000044792247059431263),
      b: expect.closeTo(0.006647758889393291),
      c: expect.closeTo(0.9866148977270944),
      d: expect.closeTo(0.006647758889393291),
      e: expect.closeTo(0.000044792247059431263),
    })
  });
});
