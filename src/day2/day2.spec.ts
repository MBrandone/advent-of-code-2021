import { part1, part2 } from "./day2"

const examplePuzzleFilePath = 'src/day2/examplePuzzle.txt'
const realPuzzleFilePath = 'src/day2/puzzle.txt'

describe('Day 2', () => {
    describe('Part 1', () => {
        test('example', () => {
            // when
            const result = part1(examplePuzzleFilePath)

            // then
            expect(result).toBe(150)
        })

        test('real challenge', () => {
            // when
            const result = part1(realPuzzleFilePath)

            // then
            expect(result).toBe(2027977)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // when
            const result = part2(examplePuzzleFilePath)

            // then
            expect(result).toBe(900)
        })

        test('real challenge', () => {
            // when
            const result = part2(realPuzzleFilePath)

            // then
            expect(result).toBe(1903644897)
        })
    })
})