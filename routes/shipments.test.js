"use strict";

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error for invalid request body", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: true,
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.name is not of a type(s) string"
        ],
        "status": 400
      }
    });

  });
});
