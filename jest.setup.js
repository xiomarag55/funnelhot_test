require('@testing-library/jest-dom');
const { cleanup } = require('@testing-library/react');

// Limpiar después de cada test
afterEach(() => {
    cleanup();
});
