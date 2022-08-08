import { describe, expect, it } from "vitest";

describe('App component', () => {
    it('normal imports as expected (component Header)', async () => {
        const header = await import('../../src/layout/Header.vue');
        expect(header).toBeDefined();
    });

    it('normal imports as expected (component Footer)', async () => {
        const footer = await import('../../src/layout/Footer.vue');
        expect(footer).toBeDefined();
    });
});