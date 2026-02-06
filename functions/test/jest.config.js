module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest", // Transform JSX and JS files using babel-jest
    },
    setupFilesAfterEnv: ['./setup.js'], // Load your setup.js after the test environment is set up
    testEnvironment: 'node', // Specify node environment, suitable for Firebase functions
    transformIgnorePatterns: ["/node_modules/(?!(chai)/)"], // Ignore transformations on node_modules except chai
};
