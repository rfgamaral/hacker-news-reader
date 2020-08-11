module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    collectCoverageFrom: ['./src/**/*.{js,jsx,ts,tsx}', '!src/**/index.{js,jsx,ts,tsx}'],
    coverageReporters: ['html', 'text-summary'],
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
