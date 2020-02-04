import { expect } from 'chai';

describe('Experimental test to check quickly check/refresh js features', () => {
    const orRegex = /\/first|\/second|\/third|\/forth/
    for (let p of ['/first', '/second', '/third', '/forth']) {
        it(`Tests or regex ${orRegex} on ${p}`, () => {
            expect(orRegex.test(p)).to.equal(true);
        });
    }
});