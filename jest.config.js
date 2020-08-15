module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    clearMocks: true,
    collectCoverageFrom: [
        './src/**/*.{js,jsx,ts,tsx}',
        '!./src/mocks/**',
        '!./src/**/index.{js,jsx,ts,tsx}',
    ],
    coverageReporters: ['html', 'text-summary'],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
};
