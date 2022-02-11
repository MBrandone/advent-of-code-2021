import { Board, part1, part2, whoIsTheLooser, whoIsTheWinner } from "./day4"

const examplePuzzleFilePath = 'src/day4/examplePuzzle.txt'
const realPuzzleFilePath = 'src/day4/puzzle.txt'

describe('Day 4', () => {

    describe('Board', () => {
        it('should return true when wins with line', () => {
            // given
            let board = new Board([1, 2, 3, 4])

            // when
            const result = board.atLeastOneLineOrColumnComplete([1, 2])

            // then
            expect(result).toBe(true)
        })

        it('should return true when wins with columns', () => {
            // given
            let board = new Board([1, 2, 3, 4])

            // when
            const result = board.atLeastOneLineOrColumnComplete([2, 4])

            // then
            expect(result).toBe(true)
        })

        it('should return false when do not win', () => {
            // given
            let board = new Board([1, 2, 3, 4])

            // when
            const result = board.atLeastOneLineOrColumnComplete([1, 4])

            // then
            expect(result).toBe(false)
        })

        it('should return false when do not win with one number', () => {
            // given
            let board = new Board([1, 2, 3, 4])

            // when
            const result = board.atLeastOneLineOrColumnComplete([1])

            // then
            expect(result).toBe(false)
        })

    })

    describe('Part 1', () => {
        test('my example', () => {
            // given
            const mySortedNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const myBoards = [[1, 2, 3, 4], [4, 5, 6, 7], [8, 9, 10, 1]]

            // when
            const result = whoIsTheWinner(mySortedNumber, myBoards)

            // then
            expect(result).toBe(14)
        })

        test('AoC example', () => {
            // when
            const result = part1(examplePuzzleFilePath)

            // then
            expect(result).toBe(4512)
        })

        test('real challenge', () => {
            // when
            const result = part1(realPuzzleFilePath)

            // then
            expect(result).toBe(21607)
        })
    })

    describe('Part 2', () => {
        test('my example', () => {
            // given
            const mySortedNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const myBoards = [[1, 2, 3, 4], [4, 5, 6, 7], [1, 2, 10, 3]]

            // when
            const result = whoIsTheLooser(mySortedNumber, myBoards)

            // then
            expect(result).toBe(65)
        })

        test('AoC example', () => {
            // when
            const result = part2(examplePuzzleFilePath)

            // then
            expect(result).toBe(1924)
        })

        test('real challenge', () => {
            // when
            const result = part2(realPuzzleFilePath)

            // then
            expect(result).toBe(19012)

        })
    })
})