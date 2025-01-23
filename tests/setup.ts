import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest'


afterEach(() => {
    vi.resetAllMocks()
    cleanup();
    vi.resetAllMocks();
});
