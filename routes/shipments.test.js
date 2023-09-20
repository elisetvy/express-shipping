"use strict";

const shipItApi = require('../shipItApi');
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");

//TODO:could use after all to do .mockClear(); (or reset())


describe("POST /", function () {
  // test("valid", async function () {
  //   const resp = await request(app).post("/shipments").send({
  //     productId: 1000,
  //     name: "Test Tester",
  //     addr: "100 Test St",
  //     zip: "12345-6789",
  //   });

  //   expect(resp.body).toEqual({ shipped: expect.any(Number) });
  // });


  test("valid route", async function () {
    shipItApi.shipProduct.mockReturnValue(123);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 123 });
  });


  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });


  test("throws error if bad body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send({
        productId: 1000,
        name: 123,
        addr: "100 Test St",
      });
    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      "error": {
        "message": [
          "instance.name is not of a type(s) string",
          "instance requires property \"zip\""
        ],
        "status": 400
      }
    });
  });

});
