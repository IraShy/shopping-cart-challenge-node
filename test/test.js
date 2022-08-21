// TODO: write the actual tests

// cd /path/to/my/project

// install Mocha in Node (may be different for a browser):
// npm install -D mocha
// or
// npm install --save-dev mocha

// Mocha uses GLOBALS. There's no imports, namespaces, it just dumps everything in the main namespace.

// we need our middleware
const assert = require("assert");
const requestTime = require("../main");

// describe(title, callback) creates a Suite

describe("requestTime middleware", function () {
  // tests go here

  // unit test with assert module:
  // it(title, callback)
  it("should add a `requestTime` property to the `req` parameter", function () {
    const req = {};
    requestTime(req, null, () => {});

    // make assertion
    assert.ok(req.requestTime > 0);
    // if the argument passed to assert.ok is truthy, it passes; if not, it fails

    // npm test
    // -> TypeError: next is not a function
  });

  //
});
