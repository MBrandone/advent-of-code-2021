import {decode, howManyTimesDigit1Or4Or7Or8Appear, sumOfDecodedNumbers} from "./day8";
import {puzzle} from "./puzzle";

describe('Day Template', () => {
    describe('Prework', () => {
        test('should decode', () => {
            // given
            const exampleData = ['cgdf', 'eagcbf', 'fc', 'adefg', 'eacdb', 'fbedga', 'geafcd', 'efc', 'dacfe', 'fdgaecb']

            // when
            const result = decode(exampleData)

            // then
            expect(result.a).toBe('e')
            expect(result.b).toBe('g')
            expect(result.c).toBe('c')
            expect(result.d).toBe('d')
            expect(result.e).toBe('b')
            expect(result.f).toBe('f')
            expect(result.g).toBe('a')
        })

        test('should decode 2', () => {
            // given
            const exampleData = ['acedgfb', 'cdfbe', 'gcdfa', 'fbcad', 'dab', 'cefabd', 'cdfgeb', 'eafb', 'cagedb', 'ab']

            // when
            const result = decode(exampleData)

            // then
            expect(result.a).toBe('d')
            expect(result.b).toBe('e')
            expect(result.c).toBe('a')
            expect(result.d).toBe('f')
            expect(result.e).toBe('g')
            expect(result.f).toBe('b')
            expect(result.g).toBe('c')
        })
    })

    describe('Part 1', () => {
        test('example', () => {
            // given
            const exampleData = [
                [['cgdf', 'eagcbf', 'fc', 'adefg', 'eacdb', 'fbedga', 'geafcd', 'efc', 'dacfe', 'fdgaecb'], ['dcefbag', 'dgcf', 'fc', 'daefc']],
                [['bdecf', 'dcagb', 'gbf', 'gcbdf', 'deacbf', 'fg', 'fdebgc', 'fegdcba', 'dgef', 'bgefac'], ['dbfec', 'gbacefd', 'gf', 'bfg']],
            ]

            // when
            const result = howManyTimesDigit1Or4Or7Or8Appear(exampleData)

            // then
            expect(result).toBe(6)
        })

        test('real challenge', () => {
            // when
            const result = howManyTimesDigit1Or4Or7Or8Appear(puzzle)

            // then
            expect(result).toBe(362)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // given
            const exampleData = [
                [['cgdf', 'eagcbf', 'fc', 'adefg', 'eacdb', 'fbedga', 'geafcd', 'efc', 'dacfe', 'fdgaecb'], ['dcefbag', 'dgcf', 'fc', 'daefc']],
                [['bdecf', 'dcagb', 'gbf', 'gcbdf', 'deacbf', 'fg', 'fdebgc', 'fegdcba', 'dgef', 'bgefac'], ['dbfec', 'gbacefd', 'gf', 'bfg']],
            ]

            // when
            const result = sumOfDecodedNumbers(exampleData)

            // then
            expect(result).toBe(14230)
        })

        test('real challenge', () => {
            // when
            const result = sumOfDecodedNumbers(puzzle)

            // then
            expect(result).toBe(1020159)

        });
    });
})