import { formatTimestampToUTCString } from '.';

describe('Util: time', () => {
    describe('#formatTimestampToUTCString', () => {
        it('timestamp is formatted to correct string', () => {
            expect(formatTimestampToUTCString(3000000000)).toBe('Sat, 24 Jan 2065 05:20:00 GMT');
        });
    });
});
