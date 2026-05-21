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

  it("should enforce unique email", async () => {
    await User.create({
      username: "user1",
      email: "unique@test.com",
    });

    await expect(
      User.create({
        username: "user2",
        email: "unique@test.com",
      }),
    ).rejects.toThrow();
  });

  it("should enforce unique username", async () => {
    await User.create({
      username: "sameuser",
      email: "a@test.com",
    });

    await expect(
      User.create({
        username: "sameuser",
        email: "b@test.com",
      }),
    ).rejects.toThrow();
  });

  it("should validate email format", async () => {
    await expect(
      User.create({
        username: "bademailuser",
        email: "not-an-email",
      }),
    ).rejects.toThrow("Invalid email format");
  });

  it("should validate profileImage URL", async () => {
    await expect(
      User.create({
        username: "imguser",
        email: "img@test.com",
        profileImage: "not-a-url",
      }),
    ).rejects.toThrow("profileImage must be a valid URL");
  });
});
