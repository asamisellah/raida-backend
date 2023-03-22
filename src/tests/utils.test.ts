import { encryptPass, resBodyBuilder } from "../api/utils/commonUtils";
import bcrypt from "bcrypt";

describe("Utils test", () => {
  it("should test encryptPass method encrypts password string", async () => {
    const password = "MyPassword1!";
    const encryptedPass = await encryptPass(password);
    bcrypt.compare(password, encryptedPass, function (err, result) {
      expect(result).toBe(true);
    });
  });
  it("should create response payload for success response", () => {
    const message = "Successfully created user";
    const data = { name: "John Doe" };
    const expected = { message, data };
    const resPayload = resBodyBuilder(message, data, false);
    expect(resPayload).toEqual(expected);
  });
  it("should create response payload for error response", () => {
    const message = "Failed to create user";
    const data = { text: "Value missing" };
    const expected = { message, errors: data };
    const resPayload = resBodyBuilder(message, data, true);
    expect(resPayload).toEqual(expected);
    expect(resPayload.errors).toBe(data);
  });
});
