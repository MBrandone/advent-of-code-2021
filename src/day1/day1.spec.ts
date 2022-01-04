import {
    day1Part1, day1Part2,
    transformTxtToArray
} from "./day1";

const examplePuzzleFilePath = 'src/day1/examplePuzzle.txt'
const realPuzzleFilePath = 'src/day1/puzzle.txt'

describe('Day 1', () => {
    describe('pre-work transforming data', () => {
        test('transform txt to array', () => {
            const result = transformTxtToArray(examplePuzzleFilePath)

            expect(result).toEqual(expect.arrayContaining([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]))
        })
    })

    describe('Part 1', () => {
        test('example', () => {
            // when
            const result = day1Part1(examplePuzzleFilePath)

            // then
            expect(result).toBe(7)
        })

        test('real challenge', () => {
            // when
            const result = day1Part1(realPuzzleFilePath)

            // then
            expect(result).toBe(1400)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // when
            const result = day1Part2(examplePuzzleFilePath)

            // then
            expect(result).toBe(5)
        })

        test('real challenge', () => {
            // when
            const result = day1Part2(realPuzzleFilePath)

            // then
            expect(result).toBe(1429)

        });
    });

})