import {howManyLanternFishAfterDays} from "./day6";
import {puzzle} from "./puzzle";

describe('Day 6', () => {
    describe('Part 1', () => {
        test('example', () => {
            // given
            const exampleData = [3,4,3,1,2]

            // when
            const result = howManyLanternFishAfterDays(exampleData, 80)

            // then
            expect(result).toBe(5934)
        })

        test('real challenge', () => {
            // when
            const result = howManyLanternFishAfterDays(puzzle, 80)

            // then
            expect(result).toBe(360268)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // given
            const exampleData = [3,4,3,1,2]

            // when
            const result = howManyLanternFishAfterDays(exampleData, 256)

            // then
            expect(result).toBe(26984457539)
        })

        test('real challenge', () => {
            // when
            const result = howManyLanternFishAfterDays(puzzle, 256)

            // then
            expect(result).toBe(1632146183902)
        })
    });
})