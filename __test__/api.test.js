const route = require('../server/routes/api');
const express = require('express');
const app = express();
const request = require('supertest');
// const mongoose = require('mongoose');
// const mongoDB = 'mongodb://127.0.0.1/my_test_database';





app.use(express.urlencoded({ extended: false }));
app.use("/", route);

describe('testing route', () => {
  test("route works", done => {
   request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({ key: "value" })
      .expect(200, done);
  });
});

describe('test route', ()=> {
  test("testing route works", done => {
   request(app)
      .post("/test")
      .type("form")
      .send({ item: "testing item" })
      .then(() => {
       request(app)
         .get("/test")
         .expect({ array: ["testing item"] }, done);
    });
  });
});