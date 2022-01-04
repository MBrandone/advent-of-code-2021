import {howManyTimesDepthIncrease, howManyTimesDepthIncreaseWithWindows} from "./day1";
import {measurement} from "./puzzle";

describe('Day 1', () => {
    describe('Part 1', () => {
        test('example', () => {
            // given
            const exampleData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

            // when
            const result = howManyTimesDepthIncrease(exampleData)

            // then
            expect(result).toBe(7)
        })

        test('real challenge', () => {
            // when
            const result = howManyTimesDepthIncrease(measurement)

            // then
            expect(result).toBe(1400)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // given
            const exampleData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

            // when
            const result = howManyTimesDepthIncreaseWithWindows(exampleData)

            // then
            expect(result).toBe(5)
        })

        test('real challenge', () => {
            // when
            const result = howManyTimesDepthIncreaseWithWindows(measurement)

            // then
            expect(result).toBe(1429)

        });
    });
})