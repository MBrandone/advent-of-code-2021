import {whoIsTheLooser, whoIsTheWinner} from "./day4";
import {boards, sortedNumbers,} from "./puzzle";
import {exampleBoards, exampleSortedNumbers} from "./examplePuzzle";

describe('Day 4', () => {
    describe('Part 1', () => {
        test('my example', () => {
            // given
            const mySortedNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const myBoards = [[1,2,3,4], [4,5,6,7], [8,9,10,1]]

            // when
            const result = whoIsTheWinner(mySortedNumber, myBoards)

            // then
            expect(result).toBe(14)
        })

        test('AoC example', () => {
            // when
            const result = whoIsTheWinner(exampleSortedNumbers, exampleBoards)

            // then
            expect(result).toBe(4512)
        })

        test('real challenge', () => {
            // when
            const result = whoIsTheWinner(sortedNumbers, boards)

            // then
            expect(result).toBe(21607)
        })
    })

    describe('Part 2', () => {
        test('my example', () => {
            // given
            const mySortedNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            const myBoards = [[1,2,3,4], [4,5,6,7], [1,2,10,3]]

            // when
            const result = whoIsTheLooser(mySortedNumber, myBoards)

            // then
            expect(result).toBe(65)
        })

        test('AoC example', () => {
            // when
            const result = whoIsTheLooser(exampleSortedNumbers, exampleBoards)

            // then
            expect(result).toBe(1924)
        })

        test('real challenge', () => {
            // when
            const result = whoIsTheLooser(sortedNumbers, boards)

            // then
            expect(result).toBe(19012)

        });
    });
})