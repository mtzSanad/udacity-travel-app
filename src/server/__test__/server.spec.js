const request = require("supertest");
const express = require("express");
import "babel-polyfill";

const app = require("../index");

describe("POST /travelapi", function () {
  it("responds with json", async () => {
    const respone = await request(app)
      .post("/travelapi")
      .send({ city: "New York" });
    expect(respone.statusCode).toEqual(200);
    expect(respone.body.images[0].tags).toBe(
      "george washington bridge, new york city, buildings"
    );
  });
});
