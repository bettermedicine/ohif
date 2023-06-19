// Our copy of the ohif-3 jest config to run our extension tests
// Used to Overwrite the default jest.config.js in the ohif-3 folder

// Borrowing from here:
// https://github.com/facebook/jest/issues/3112#issuecomment-398581705
const base = require("./jest.config.base.js");

module.exports = {
  ...base,
  // https://jestjs.io/docs/en/configuration#projects-array-string-projectconfig
  projects: [
    "<rootDir>/platform/*/jest.config.js",
    "<rootDir>/extensions/*/jest.config.js",
    //'<rootDir>/modes/*/jest.config.js' // Enable if any mode definitions start including tests
    "../ohif-3-extensions/**/jest.config.js",
  ],
  coverageDirectory: "<rootDir>/coverage/",
};
