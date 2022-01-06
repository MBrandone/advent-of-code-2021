import {
    part1,
    part2
} from "./day3"

const examplePuzzleFilePath = 'src/day3/examplePuzzle.txt'
const realPuzzleFilePath = 'src/day3/puzzle.txt'

describe('Day 3', () => {
    describe('Part 1', () => {
        test('example', () => {
            // when
            const result = part1(examplePuzzleFilePath)

            // then
            expect(result).toBe(198)
        })

        test('real challenge', () => {
            // when
            const result = part1(realPuzzleFilePath)

            // then
            expect(result).toBe(2967914)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // when
            const result = part2(examplePuzzleFilePath)

            // then
            expect(result).toBe(230)
        })

        test('real challenge', () => {
            // when
            const result = part2(realPuzzleFilePath)

            // then
            expect(result).toBe(7041258)
        })
    })

})