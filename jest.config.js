module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testRegex: '.src/tests/.*\\.(tests|spec)?\\.ts',
    testPathIgnorePatterns: ["/node_modules/"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};