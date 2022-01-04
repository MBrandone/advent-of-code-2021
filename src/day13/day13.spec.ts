import {howManyDotsAfterFold} from "./day13";
import {initialPresentsDots, instructions} from "./puzzle";

describe('Day 13', () => {
    describe('Part 1', () => {
        test('example 1', () => {
            // given
            const exampleData = [
                [6,10],
                [0,14],
                [9,10],
                [0,3],
                [10,4],
                [4,11],
                [6,0],
                [6,12],
                [4,1],
                [0,13],
                [10,12],
                [3,4],
                [3,0],
                [8,4],
                [1,10],
                [2,14],
                [8,10],
                [9,0],
            ]

            const exampleInstructions = [
                'fold along y=7',
            ]

            // when
            const result = howManyDotsAfterFold(exampleData, exampleInstructions)

            // then
            expect(result.howManyFullDots).toBe(17)
        })

        test('example 2', () => {
            // given
            const exampleData = [
                [6,10],
                [0,14],
                [9,10],
                [0,3],
                [10,4],
                [4,11],
                [6,0],
                [6,12],
                [4,1],
                [0,13],
                [10,12],
                [3,4],
                [3,0],
                [8,4],
                [1,10],
                [2,14],
                [8,10],
                [9,0],
            ]

            const exampleInstructions = [
                'fold along y=7',
                'fold along x=5',
            ]

            // when
            const result = howManyDotsAfterFold(exampleData, exampleInstructions)

            // then
            expect(result.howManyFullDots).toBe(16)
        })

        test('example 3', () => {
            // given
            const exampleData = [
                [0,0],
                [0,9],
                [9,9],
                [10,9],
                [9,10],
            ]

            const exampleInstructions = [
                'fold along y=5',
                'fold along x=5',
            ]

            // when
            const result = howManyDotsAfterFold(exampleData, exampleInstructions)

            // then
            expect(result.howManyFullDots).toBe(4)
        })

        test('example 4', () => {
            // given
            const exampleData = [
                [8,8],
                [0,0],
            ]

            const exampleInstructions = [
                'fold along x=4',
                'fold along y=4',
            ]

            // when
            const result = howManyDotsAfterFold(exampleData, exampleInstructions)

            // then
            expect(result.howManyFullDots).toBe(1)
        })

        test('real challenge', () => {
            // when
            const result = howManyDotsAfterFold(initialPresentsDots, [instructions[0]])

            // then
            expect(result.howManyFullDots).toBe(675)
        })
    })

    describe('Part 2', () => {
        test('real challenge', () => {
            // when
            const result = howManyDotsAfterFold(initialPresentsDots, instructions)

            result.grid.forEach(line => console.log(line) + '\n')
            // then
            expect(result.howManyFullDots).toBe(98)
        });
    });
})