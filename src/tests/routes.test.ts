import makeApp from "../../index";
import request from "supertest";
import db from "./db";
import { validDriver } from "./mock-data";

let app: any;

describe("Driver routes", () => {
  beforeAll(async () => {
    app = await makeApp(db.connect());
  });

  afterEach(async () => await db.clearDatabase());
  afterAll(async () => await db.closeDatabase());

  it("should create a new driver with valid data", async () => {
    const response = await request(app)
      .post("/drivers/create")
      .send(validDriver);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Driver created successfully");
    expect(response.body.errors).toBe(undefined);
    expect(response.body.data).toHaveProperty("_id");
  });

  it("should not create a new driver with invalid data", async () => {
    const invalidDriver = { ...validDriver, email: "invalid-email" };
    const response = await request(app)
      .post("/drivers/create")
      .send(invalidDriver);

    expect(response.status).toBe(400);
    expect(response.body.errors.message).toContain("email");
    expect(response.body.message).toContain("Validation error");
  });
});

// describe("when passed a driver request payload", () => {
//   test("should respond with a 200 status code", async () => {
//     const response = await request(app).post("/users").send({
//       username: "username",
//       password: "password",
//     });
//     expect(response.statusCode).toBe(200);
//   });
// });
