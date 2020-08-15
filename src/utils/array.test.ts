import { pickRandomElementFromArray } from '.';

describe('Util: array', () => {
    describe('#pickRandomElementFromArray', () => {
        it('random element from the array is returned', () => {
            const array = ['Huey', 'Dewey', 'Louie'];

            const randomElement = pickRandomElementFromArray(array);

            expect(array).toContain(randomElement);
        });
    });
});
