import {whereIsTheShip, whereIsTheShip2} from "./day2";
import {mouvments} from "./puzzle";

describe('Day 2', () => {
    describe('Part 1', () => {
        test('example', () => {
            // given
            const exampleData = [
                'forward 5',
                'down 5',
                'forward 8',
                'up 3',
                'down 8',
                'forward 2',
            ]

            // when
            const result = whereIsTheShip(exampleData)

            // then
            expect(result).toBe(150)
        })

        test('real challenge', () => {
            // when
            const result = whereIsTheShip(mouvments)

            // then
            expect(result).toBe(2027977)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // given
            const exampleData = [
                'forward 5',
                'down 5',
                'forward 8',
                'up 3',
                'down 8',
                'forward 2',
            ]

            // when
            const result = whereIsTheShip2(exampleData)

            // then
            expect(result).toBe(900)
        })

        test('real challenge', () => {
            // when
            const result = whereIsTheShip2(mouvments)

            // then
            expect(result).toBe(1903644897)

        });
    });
})