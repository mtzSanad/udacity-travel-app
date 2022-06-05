import "babel-polyfill";

const { print } = require("../js/print");

describe("Print Handler tests", () => {
  test("Check function exist", () => {
    expect(print).toBeDefined();
  });
});
