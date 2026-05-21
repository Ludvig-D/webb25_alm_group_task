import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "../src/db/mongoose.js";
import { beforeAll, afterAll, afterEach } from "vitest";

mongoose.models = {};
mongoose.modelSchemas = {};

const { default: User } = await import("../src/models/User.js");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  await User.syncIndexes();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
