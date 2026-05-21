import "../test-setup.mjs";
import { describe, it, expect } from "vitest";
import User from "../../src/models/User.js";

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  // TODO: Test that email must be unique
  // TODO: Test that username must be unique
  // TODO: Test that email format is validated
  // TODO: Test that profileImage is a valid URL
});
