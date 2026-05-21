import { describe, it, expect } from "vitest";
import mongoose from "mongoose";
import Accommodation from "../../src/models/Accommondation.js";

describe("Accommodation model", () => {
  it("ska kräva address", () => {
    const acc = new Accommodation({});
    const err = acc.validateSync();
    expect(err.errors.address).toBeDefined();
  });

  it("ska kräva stad", () => {
    const acc = new Accommodation({});
    const err = acc.validateSync();
    expect(err.errors.city).toBeDefined();
  });

  it("ska kräva userId", () => {
    const acc = new Accommodation({});
    const err = acc.validateSync();
    expect(err.errors.userId).toBeDefined();
  });

  it("ska godkänna ett giltigt objekt", () => {
    const acc = new Accommodation({
      address: "Storgatan 1",
      city: "Stockholm",
      country: "Sverige",
      zipCode: "11122",
      rent: 8000,
      rooms: 3,
      userId: new mongoose.Types.ObjectId(),
    });
    const err = acc.validateSync();
    expect(err).toBeUndefined();
  });
});