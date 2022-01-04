import {howManyTimesWindsCross, howManyTimesWindsCrossWithDiagonalWinds} from "./day5";
import {puzzle} from "./puzzle";

describe('Day 5', () => {
    describe('Part 1', () => {
        test('example', () => {
            // given
            const exampleData = [
                [[0,9], [5,9]],
                [[8,0], [0,8]],
                [[9,4], [3,4]],
                [[2,2], [2,1]],
                [[7,0], [7,4]],
                [[6,4], [2,0]],
                [[0,9], [2,9]],
                [[3,4], [1,4]],
                [[0,0], [8,8]],
                [[5,5], [8,2]],
            ]

            // when
            const result = howManyTimesWindsCross(exampleData)

            // then
            expect(result).toBe(5)
        })

        test('real challenge', () => {
            // when
            const result = howManyTimesWindsCross(puzzle)

            // then
            expect(result).toBe(7269)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // given
            const exampleData = [
                [[0,9], [5,9]],
                [[8,0], [0,8]],
                [[9,4], [3,4]],
                [[2,2], [2,1]],
                [[7,0], [7,4]],
                [[6,4], [2,0]],
                [[0,9], [2,9]],
                [[3,4], [1,4]],
                [[0,0], [8,8]],
                [[5,5], [8,2]],
            ]

            // when
            const result = howManyTimesWindsCrossWithDiagonalWinds(exampleData)

            // then
            expect(result).toBe(12)
        })

        test('real challenge', () => {
            // when
            const result = howManyTimesWindsCrossWithDiagonalWinds(puzzle)

            // then
            expect(result).toBe(21140)

        });
    });
})