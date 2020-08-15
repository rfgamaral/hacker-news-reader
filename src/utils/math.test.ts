import { clamp } from '.';

describe('Util: math', () => {
    describe('#clamp', () => {
        describe('when `x` is below the range', () => {
            it('return the lower value', () => {
                expect(clamp(1, 5, 15)).toBe(5);
            });
        });

        describe('when `x` is within the range', () => {
            it('return the `x` value', () => {
                expect(clamp(10, 5, 15)).toBe(10);
            });
        });

        describe('when `x` is above the range', () => {
            it('return the upper value', () => {
                expect(clamp(20, 5, 15)).toBe(15);
            });
        });
    });
});
