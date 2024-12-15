export default {
  testEnvironment: "jsdom", // Simulates browser environment for React
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // Use Babel to process JS, JSX, TS, and TSX files
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"], // Recognize these extensions
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Point to the setup file
};
