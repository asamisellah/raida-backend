module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: [
    "text",
    "html"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
}
