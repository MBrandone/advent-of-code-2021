import {howManyPaths, howManyPathsPart2} from "./day12";
import {puzzle} from "./puzzle";

describe('Day 12', () => {
    describe('Part 1', () => {
        test('example 1', () => {
            // given
            const exampleData = [
                'start-A',
                'start-b',
                'A-c',
                'A-b',
                'b-d',
                'A-end',
                'b-end',
            ]

            // when
            const result = howManyPaths(exampleData)

            // then
            expect(result).toBe(10)
        })

        test('example 2', () => {
            // given
            const exampleData = [
                'dc-end',
                'HN-start',
                'start-kj',
                'dc-start',
                'dc-HN',
                'LN-dc',
                'HN-end',
                'kj-sa',
                'kj-HN',
                'kj-dc',
            ]

            // when
            const result = howManyPaths(exampleData)

            // then
            expect(result).toBe(19)
        })

        test('example 3', () => {
            // given
            const exampleData = [
                'fs-end',
                'he-DX',
                'fs-he',
                'start-DX',
                'pj-DX',
                'end-zg',
                'zg-sl',
                'zg-pj',
                'pj-he',
                'RW-he',
                'fs-DX',
                'pj-RW',
                'zg-RW',
                'start-pj',
                'he-WI',
                'zg-he',
                'pj-fs',
                'start-RW',
            ]

            // when
            const result = howManyPaths(exampleData)

            // then
            expect(result).toBe(226)
        })

        test('real challenge', () => {
            // when
            const result = howManyPaths(puzzle)

            // then
            expect(result).toBe(4549)
        })
    })

    describe('Part 2', () => {
        test('example 1', () => {
            // given
            const exampleData = [
                'start-A',
                'start-b',
                'A-c',
                'A-b',
                'b-d',
                'A-end',
                'b-end',
            ]

            // when
            const result = howManyPathsPart2(exampleData)

            // then
            expect(result).toBe(36)
        })

        test('example 2', () => {
            // given
            const exampleData = [
                'dc-end',
                'HN-start',
                'start-kj',
                'dc-start',
                'dc-HN',
                'LN-dc',
                'HN-end',
                'kj-sa',
                'kj-HN',
                'kj-dc',
            ]

            // when
            const result = howManyPathsPart2(exampleData)

            // then
            expect(result).toBe(103)
        })

        test('example 3', () => {
            // given
            const exampleData = [
                'fs-end',
                'he-DX',
                'fs-he',
                'start-DX',
                'pj-DX',
                'end-zg',
                'zg-sl',
                'zg-pj',
                'pj-he',
                'RW-he',
                'fs-DX',
                'pj-RW',
                'zg-RW',
                'start-pj',
                'he-WI',
                'zg-he',
                'pj-fs',
                'start-RW',
            ]

            // when
            const result = howManyPathsPart2(exampleData)

            // then
            expect(result).toBe(3509)
        })

        test('real challenge', () => {
            // when
            const result = howManyPathsPart2(puzzle)

            // then
            expect(result).toBe(120535)
        })
    });
})