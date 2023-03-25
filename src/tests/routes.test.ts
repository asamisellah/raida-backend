import makeApp from "../../index";
import request from "supertest";
import db from "./db";
import { validDriver, validRideRequest, validUser } from "./mock-data";
import { StatusCodes } from "http-status-codes";
import { RideRequestModel } from "../api/models/rideModel";

let app: any;

describe("Test App Routes", () => {
  beforeAll(async () => {
    app = await makeApp(db.connect());
  });

  afterEach(async () => await db.clearDatabase());
  afterAll(async () => await db.closeDatabase());

  // Driver routes tests
  describe("Driver routes", () => {
    it("should create a new driver with valid data", async () => {
      const response = await request(app)
        .post("/drivers/create")
        .send(validDriver);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.message).toBe("Driver created successfully");
      expect(response.body.errors).toBe(undefined);
      expect(response.body.data).toHaveProperty("_id");
    });

    it("should not create a new driver with invalid data", async () => {
      const invalidDriver = { ...validDriver, email: "invalid-email" };
      const response = await request(app)
        .post("/drivers/create")
        .send(invalidDriver);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.errors.message).toContain("email");
      expect(response.body.message).toContain("Validation error");
    });
  });

  // Ride routes tests
  describe("Ride routes", () => {
    test("should create ride request with valid data", async () => {
      await request(app).post("/rides/request").send(validRideRequest);
      const passangerId = validRideRequest.passangerId;

      const ride = await RideRequestModel.findOne({
        passangerId,
      }).lean();

      console.log(ride);
      expect(ride.rideStatus).toBe("created");
    });

    test("should not create ride request with invalid data", async () => {
      validRideRequest.passangerId = "";
      const response = await request(app)
        .post("/rides/request")
        .send(validRideRequest);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.errors.message).toContain("required");
      expect(response.body.message).toContain("Validation error");
    });
  });

  // User routes tests
  describe("User routes", () => {
    test("should create new user with valid data", async () => {
      const response = await request(app).post("/users/create").send(validUser);

      expect(response.status).toBe(StatusCodes.CREATED);
      expect(response.body.message).toBe("User created successfully");
      expect(response.body.errors).toBe(undefined);
      expect(response.body.data).toHaveProperty("_id");
    });

    test("should not create new user with invalid data", async () => {
      validUser.name = "";
      const response = await request(app).post("/users/create").send(validUser);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.errors.message).toContain("required");
      expect(response.body.message).toContain("Validation error");
    });
  });
});
