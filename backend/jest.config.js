const path = require("path");

module.exports = {
    setupFilesAfterEnv: ["<rootDir>/tests/setupModels.js"],
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json"],

  // 👇 FIXES ALIAS RESOLUTION
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  roots: ["<rootDir>/tests"],

  // Optional but useful for clean output
  verbose: true,
};
