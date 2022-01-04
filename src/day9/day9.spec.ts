import {productOfThreeLargestBasins, whatIsTheSumOfRiskLevelsOfLowPoints} from "./day9";
import {puzzle} from "./puzzle";

describe('Day 9', () => {
    describe('Part 1', () => {
        test('example', () => {
            // given
            const exampleData = [
                [2,1,9,9,9,4,3,2,1,0],
                [3,9,8,7,8,9,4,9,2,1],
                [9,8,5,6,7,8,9,8,9,2],
                [8,7,6,7,8,9,6,7,8,9],
                [9,8,9,9,9,6,5,6,7,8],
            ]

            // when
            const result = whatIsTheSumOfRiskLevelsOfLowPoints(exampleData)

            // then
            expect(result).toBe(15)
        })

        test('real challenge', () => {
            // when
            const result = whatIsTheSumOfRiskLevelsOfLowPoints(puzzle)

            // then
            expect(result).toBe(545)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // given
            const exampleData = [
                [2,1,9,9,9,4,3,2,1,0],
                [3,9,8,7,8,9,4,9,2,1],
                [9,8,5,6,7,8,9,8,9,2],
                [8,7,6,7,8,9,6,7,8,9],
                [9,8,9,9,9,6,5,6,7,8],
            ]

            // when
            const result = productOfThreeLargestBasins(exampleData)

            // then
            expect(result).toBe(1134)
        })

        test('real challenge', () => {
            // when
            const result = productOfThreeLargestBasins(puzzle)

            // then
            expect(result).toBe(950600)
        });
    });
})