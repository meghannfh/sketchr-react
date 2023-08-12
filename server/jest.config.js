module.exports = {
    testEnvironment: 'node', // Use Node.js environment
    moduleFileExtensions: ['js', 'json'],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$', // Match test file patterns
    transform: {
      '^.+\\.js$': 'babel-jest', // Transform .js files using Babel
    },
    verbose: true, // Show detailed output
  };