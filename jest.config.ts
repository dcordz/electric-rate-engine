/** @type {import('ts-jest').JestConfigWithTsJest} **/
// jest.config.ts
import { createDefaultEsmPreset, JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  ...createDefaultEsmPreset(),
  testMatch: ["<rootDir>/src/**/*.test.ts"],
};

export default jestConfig;
