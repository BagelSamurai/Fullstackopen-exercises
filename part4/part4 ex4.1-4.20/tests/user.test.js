const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const User = require("../models/user");
const api = supertest(app);

describe("/Post/api/users", () => {
  test.only("Creating invalid user", async () => {
    const newUser = {
      username: "hi",
      name: "RealDude",
      password: "by",
    };
    const res = await api.post("/api/users").send(newUser);
    expect(res.status).toBe(400);
  });
});
