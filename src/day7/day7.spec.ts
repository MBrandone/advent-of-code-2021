import {whatIsMinimumFuelForCrabsToAlign, whatIsMinimumFuelForCrabsToAlignWithNewStrategy} from "./day7";
import {puzzle} from "./puzzle";

describe('Day 7', () => {
    describe('Part 1', () => {
        test('example', () => {
            // given
            const exampleData = [16,1,2,0,4,2,7,1,2,14]

            // when
            const result = whatIsMinimumFuelForCrabsToAlign(exampleData)

            // then
            expect(result).toBe(37)
        })

        test('real challenge', () => {
            // when
            const result = whatIsMinimumFuelForCrabsToAlign(puzzle)

            // then
            expect(result).toBe(336721)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // given
            const exampleData = [16,1,2,0,4,2,7,1,2,14]

            // when
            const result = whatIsMinimumFuelForCrabsToAlignWithNewStrategy(exampleData)

            // then
            expect(result).toBe(168)
        })

        test('real challenge', () => {
            // when
            const result = whatIsMinimumFuelForCrabsToAlignWithNewStrategy(puzzle)

            // then
            expect(result).toBe(91638945)
        })
    });
})