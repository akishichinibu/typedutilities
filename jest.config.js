/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "src/(.*)": "./src/$1"
  }
  // transformIgnorePatterns: ['node_modules', 'dist', '.yalc'],
  // testPathIgnorePatterns: ['dist', '.yalc'],
};
