import { calculatePowerConsumption, calculatePowerConsumptionAlternative } from "./day3-legacy-exercise"
import { puzzle } from "./puzzle"
import { calculateSupportRating } from "../day3/day3"

describe('Day 3 - legacy', () => {
    const exampleData = [
        '00100',
        '11110',
        '10110',
        '10111',
        '10101',
        '01111',
        '00111',
        '11100',
        '10000',
        '11001',
        '00010',
        '01010'
    ]

    describe('Part 1', () => {
        test('example', () => {
            // when
            const result = calculatePowerConsumption(exampleData)

            // then
            expect(result).toBe(198)
        })

        test('example alternative', () => {
            // when
            const result = calculatePowerConsumptionAlternative(exampleData)

            // then
            expect(result).toBe(198)
        })

        test('real challenge', () => {
            // when
            const result = calculatePowerConsumption(puzzle)

            // then
            expect(result).toBe(2967914)
        })

        test('real challeng alternative', () => {
            // when
            const result = calculatePowerConsumptionAlternative(puzzle)

            // then
            expect(result).toBe(2967914)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // when
            const result = calculateSupportRating(exampleData)

            // then
            expect(result).toBe(230)
        })

        test('real challenge', () => {
            // when
            const result = calculateSupportRating(puzzle)

            // then
            expect(result).toBe(7041258)

        });
    });
})