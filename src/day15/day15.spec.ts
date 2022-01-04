import {day15Part2, riskOfLowerRiskedPath} from "./day15";
import {puzzle} from "./puzzle";

describe('Day 15', () => {
    const exampleRiskMap = [
        [1,1,6,3,7,5,1,7,4,2],
        [1,3,8,1,3,7,3,6,7,2],
        [2,1,3,6,5,1,1,3,2,8],
        [3,6,9,4,9,3,1,5,6,9],
        [7,4,6,3,4,1,7,1,1,1],
        [1,3,1,9,1,2,8,1,3,7],
        [1,3,5,9,9,1,2,4,2,1],
        [3,1,2,5,4,2,1,6,3,9],
        [1,2,9,3,1,3,8,5,2,1],
        [2,3,1,1,9,4,4,5,8,1],
    ]

    describe('Part 1', () => {
        test('2:2 example', () => {
            // given
            const easyExample = [
                [1,2],
                [4,5],
            ]

            // when
            const result = riskOfLowerRiskedPath(easyExample)

            // then
            expect(result.riskFromStartingPoint).toBe(7)
        })

        test('3:3 example', () => {
            // given
            const easyExample = [
                [1,2,9],
                [4,1,9],
                [4,2,1],
            ]

            // when
            const result = riskOfLowerRiskedPath(easyExample)

            // then
            expect(result.riskFromStartingPoint).toBe(6)
        })

        test('example', () => {
            // when
            const result = riskOfLowerRiskedPath(exampleRiskMap)

            // then
            expect(result.riskFromStartingPoint).toBe(40)
        })

        test('real challenge', () => {
            // when
            const result = riskOfLowerRiskedPath(puzzle)

            // then
            // 442 trouvé, où est l'erreur ?
            expect(result.riskFromStartingPoint).toBe(441)
        })

    })

    describe('Part 2', () => {
        test('example', () => {
            // when
            const result = day15Part2(exampleRiskMap)

            // then
            expect(result).toBe(315)
        })

        test('real challenge', () => {
            // when
            const result = day15Part2(puzzle)

            // then
            expect(result).toBe(0)

        });
    });
})