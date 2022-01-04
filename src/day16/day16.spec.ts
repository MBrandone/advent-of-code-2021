import {day16} from "./day16";
import {puzzle} from "./puzzle";

describe('Day Template', () => {
    describe('Part 1', () => {
        test('example 1', () => {
            // given
            const exampleData = '8A004A801A8002F478'

            // when
            const result = day16(exampleData)

            // then
            expect(result).toBe(16)
        })

        test('example 2', () => {
            // given
            const exampleData = '620080001611562C8802118E34'

            // when
            const result = day16(exampleData)

            // then
            expect(result).toBe(12)
        })

        test('example 3', () => {
            // given
            const exampleData = 'C0015000016115A2E0802F182340'

            // when
            const result = day16(exampleData)

            // then
            expect(result).toBe(23)
        })

        test('example 4', () => {
            // given
            const exampleData = 'A0016C880162017C3686B18A3D4780'

            // when
            const result = day16(exampleData)

            // then
            expect(result).toBe(31)
        })

        test('real challenge', () => {
            // when
            const result = day16(puzzle)

            // then
            expect(result).toBe(0)
        })
    })

    describe('Part 2', () => {
        test('example 1', () => {
            // given
            const exampleData = '8A004A801A8002F478'

            // when
            const result = day16(exampleData)

            // then
            expect(result).toBe(16)
        })

        test('example 2', () => {
            // given
            const exampleData = '620080001611562C8802118E34'

            // when
            const result = day16(exampleData)

            // then
            expect(result).toBe(12)
        })

        test('example 3', () => {
            // given
            const exampleData = 'C0015000016115A2E0802F182340'

            // when
            const result = day16(exampleData)

            // then
            expect(result).toBe(23)
        })

        test('example 4', () => {
            // given
            const exampleData = 'A0016C880162017C3686B18A3D4780'

            // when
            const result = day16(exampleData)

            // then
            expect(result).toBe(31)
        })

        test('real challenge', () => {
            // when
            const result = day16(puzzle)

            // then
            expect(result).toBe('')

        });
    });
})