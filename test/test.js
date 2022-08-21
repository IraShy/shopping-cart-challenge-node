// cd /path/to/my/project

// install Mocha in Node (may be different for a browser):
// npm install -D mocha
// or
// npm install --save-dev mocha

// Mocha uses GLOBALS. There's no imports, namespaces, it just dumps everything in the main namespace.

// we need our middleware
const assert = require("assert");
const requestTime = require("../main");
// const app = require("../app");
const app = require("../main");
const request = require("supertest"); // helps test express servers
// supertest runs requests against server object. You don't have to start a server in process A, you just give it the server object and it will work with it directly. You don't have to listen on a port; it's a lot quicker.

// create a suite
// describe(title, callback) creates a Suite

describe("requestTime middleware", function () {
  // tests go here

  // unit test with assert module:
  // it(title, callback)
  it("should add a `requestTime` property to the `req` parameter", function () {
    // // call function
    // const req = {};
    // requestTime(req);

    // // make assertion
    // assert.ok(req.requestTime > 0);
    // // if the argument passed to assert.ok is truthy, it passes; if not, it fails

    // // npm test
    // // -> TypeError: next is not a function

    //
    // call function
    // requesttime expects an object, any arg, and finally a callback
    const req = {};
    requestTime(req, null, () => {});

    // make assertion
    assert.ok(req.requestTime > 0);
    // if the argument passed to assert.ok is truthy, it passes; if not, it fails

    // npm test
    // -> TypeError: next is not a function
  });

  //
  // an integration test
  // supertest for integration tests against Express servers
  // npm install supertest -D

  describe("GET /unix-timestamp", function () {
    it("should respond with JSON object containing timestamp", function (done) {
      // assertion goes here
      requestTime(app)
        .get("unix-timestamp")
        .expect(200)
        .then((res) => {
          assert.ok(res.body.timestamp < 1e10);
        });
    });
  });
});
