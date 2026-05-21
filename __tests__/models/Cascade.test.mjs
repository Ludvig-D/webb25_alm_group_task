import "../test-setup.mjs";

import { describe, it, expect } from "vitest";
import User from "../../src/models/User.js";
import Accommodation from "../../src/models/Accommodation.js";

describe("Cascade delete: User → Accommodation", () => {
  it("ska radera accommodations när användaren raderas", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@test.com",
    });

    await Accommodation.create({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sverige",
      zipCode: "11122",
      rent: 8000,
      rooms: 3,
      userId: user._id,
    });

    await User.findOneAndDelete({ _id: user._id });

    const remaining = await Accommodation.find({ userId: user._id });
    expect(remaining.length).toBe(0);
  });
});
