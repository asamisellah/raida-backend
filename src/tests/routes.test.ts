import request from "supertest";
import makeApp from "../../app";
import { DriverModel } from "../api/models/driverModel";

const validDriver = {
  name: "John Doe",
  email: "johndoe@example.com",
  password: "Password1!",
  username: "john_doe",
  phoneNumber: "+254712345678",
  location: {
    longitude: "12.345678",
    latitude: "45.678912",
  },
  carMake: "Toyota",
  carModel: "Corolla",
  carDescription: "Blue Toyota Corolla",
  licenseNumber: "AB12345",
  licensePlate: "KAB-123A",
};

describe("Driver routes", () => {
  // afterEach(async () => {
  //   // Clean up database after each test
  //   await DriverModel.deleteMany({});
  // });

  // describe("POST /create", () => {
  //   it("should create a new driver with valid data", async () => {
  //     const response = await request(app).post("/drivers/create").send(validDriver);
  //     expect(response.status).toBe(201);
  //     expect(response.body.message).toBe("Driver created successfully");
  //     expect(response.body.error).toBe(false);
  //     expect(response.body.data).toHaveProperty("_id");
  //   });

  //   it("should not create a new driver with invalid data", async () => {
  //     const invalidDriver = { ...validDriver, email: "invalid-email" };
  //     const response = await request(app).post("/drivers/create").send(invalidDriver);
  //     expect(response.status).toBe(400);
  //     expect(response.body.message).toContain("email");
  //     expect(response.body.error).toBe(true);
  //   });
  // });
  describe("when passed a driver request payload", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(makeApp()).post("/users").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
