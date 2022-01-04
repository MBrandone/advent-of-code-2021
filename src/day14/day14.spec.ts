import {day14} from "./day14";
import {pairInsertionsRules, polymerTemplate} from "./puzzle";

describe('Day Template', () => {
    const polymerExample = 'NNCB'
    const pairInsertionRulesExample = [
        ['CH', 'B'],
        ['HH', 'N'],
        ['CB', 'H'],
        ['NH', 'C'],
        ['HB', 'C'],
        ['HC', 'B'],
        ['HN', 'C'],
        ['NN', 'C'],
        ['BH', 'H'],
        ['NC', 'B'],
        ['NB', 'B'],
        ['BN', 'B'],
        ['BB', 'N'],
        ['BC', 'B'],
        ['CC', 'N'],
        ['CN', 'C'],
    ]

    describe('Part 1', () => {
        test('prework for 2 step', () => {
            // when
            const result = day14(polymerExample, pairInsertionRulesExample, 2)

            // then NBCCNBBBCBHCB
            expect(result.tuplesCount['NB']).toBe(2)
            expect(result.tuplesCount['BB']).toBe(2)
            expect(result.tuplesCount['BC']).toBe(2)
            expect(result.tuplesCount['CB']).toBe(2)
            expect(result.tuplesCount['CC']).toBe(1)
            expect(result.tuplesCount['CN']).toBe(1)
            expect(result.tuplesCount['BH']).toBe(1)
            expect(result.tuplesCount['HC']).toBe(1)

            expect(result.lettersCount['N']).toBe(2)
            expect(result.lettersCount['B']).toBe(6)
            expect(result.lettersCount['C']).toBe(4)
            expect(result.lettersCount['H']).toBe(1)
        })

        test('prework for 3 step', () => {
            // when
            const result = day14(polymerExample, pairInsertionRulesExample, 3)

            // then NBBBCNCCNBBNBNBBCHBHHBCHB
            // TUPLES
            expect(result.tuplesCount['NB']).toBe(4)
            expect(result.tuplesCount['BB']).toBe(4)
            expect(result.tuplesCount['BC']).toBe(3)
            expect(result.tuplesCount['HB']).toBe(3)
            expect(result.tuplesCount['CN']).toBe(2)
            expect(result.tuplesCount['BN']).toBe(2)
            expect(result.tuplesCount['CH']).toBe(2)
            expect(result.tuplesCount['NC']).toBe(1)
            expect(result.tuplesCount['CC']).toBe(1)
            expect(result.tuplesCount['BH']).toBe(1)
            expect(result.tuplesCount['HH']).toBe(1)

            // LETTERS
            expect(result.lettersCount['N']).toBe(5)
            expect(result.lettersCount['B']).toBe(11)
            expect(result.lettersCount['C']).toBe(5)
            expect(result.lettersCount['H']).toBe(4)
        })

        test('prework for 4 step', () => {
            // when
            const result = day14(polymerExample, pairInsertionRulesExample, 4)

            // then NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB
            // TUPLES
            expect(result.tuplesCount['NB']).toBe(9)
            expect(result.tuplesCount['BB']).toBe(9)
            expect(result.tuplesCount['BN']).toBe(6)
            expect(result.tuplesCount['BC']).toBe(4)
            expect(result.tuplesCount['CN']).toBe(3)
            expect(result.tuplesCount['CB']).toBe(5)
            expect(result.tuplesCount['BH']).toBe(3)
            expect(result.tuplesCount['HC']).toBe(3)
            expect(result.tuplesCount['CC']).toBe(2)
            expect(result.tuplesCount['NC']).toBe(1)
            expect(result.tuplesCount['HH']).toBe(1)
            expect(result.tuplesCount['HN']).toBe(1)
            expect(result.tuplesCount['NH']).toBe(1)

            // LETTERS
            expect(result.lettersCount['N']).toBe(11)
            expect(result.lettersCount['B']).toBe(23)
            expect(result.lettersCount['C']).toBe(10)
            expect(result.lettersCount['H']).toBe(5)
        })

        test('example 10 steps', () => {
            // when
            const result = day14(polymerExample, pairInsertionRulesExample, 10)

            // then
            expect(result.lettersCount['B']).toBe(1749)
            expect(result.lettersCount['C']).toBe(298)
            expect(result.lettersCount['H']).toBe(161)
            expect(result.lettersCount['N']).toBe(865)
            expect(result.differenceMaxMinAppearance).toBe(1588)
        })

        test('real challenge', () => {
            // when
            const result = day14(polymerTemplate, pairInsertionsRules, 10)

            // then
            expect(result.differenceMaxMinAppearance).toBe(3247)
        })
    })

    describe('Part 2', () => {

        test('example 40 steps', () => {
            // when
            const result = day14(polymerExample, pairInsertionRulesExample, 40)

            // then
            expect(result.lettersCount['B']).toBe(2192039569602)
            expect(result.lettersCount['H']).toBe(3849876073)
            expect(result.differenceMaxMinAppearance).toBe(2188189693529)
        })

        test('real challenge', () => {
            // when
            const result = day14(polymerTemplate, pairInsertionsRules, 40)

            // then
            expect(result.differenceMaxMinAppearance).toBe(4110568157153)

        });
    });
})