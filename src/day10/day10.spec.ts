import {day10, day10Part2} from "./day10";
import {puzzle} from "./puzzle";

describe('Day Template', () => {
    describe('Part 1', () => {
        test('example', () => {
            // given
            const exampleData = [
                '[({(<(())[]>[[{[]{<()<>>',
                '[(()[<>])]({[<{<<[]>>(',
                '{([(<{}[<>[]}>{[]{[(<()>',
                '(((({<>}<{<{<>}{[]{[]{}',
                '[[<[([]))<([[{}[[()]]]',
                '[{[{({}]{}}([{[{{{}}([]',
                '{<[[]]>}<{[{[{[]{()[[[]',
                '[<(<(<(<{}))><([]([]()',
                '<{([([[(<>()){}]>(<<{{',
                '<{([{{}}[<[[[<>{}]]]>[]]'
            ]

            // when
            const result = day10(exampleData)

            // then
            expect(result).toBe(26397)
        })

        test('real challenge', () => {
            // when
            const result = day10(puzzle)

            // then
            expect(result).toBe(168417)
        })
    })

    describe('Part 2', () => {
        test('example', () => {
            // given
            const exampleData = [
                '[({(<(())[]>[[{[]{<()<>>',
                '[(()[<>])]({[<{<<[]>>(',
                '{([(<{}[<>[]}>{[]{[(<()>',
                '(((({<>}<{<{<>}{[]{[]{}',
                '[[<[([]))<([[{}[[()]]]',
                '[{[{({}]{}}([{[{{{}}([]',
                '{<[[]]>}<{[{[{[]{()[[[]',
                '[<(<(<(<{}))><([]([]()',
                '<{([([[(<>()){}]>(<<{{',
                '<{([{{}}[<[[[<>{}]]]>[]]'
            ]

            // when
            const result = day10Part2(exampleData)

            // then
            expect(result).toBe(288957)
        })

        test('real challenge', () => {
            // when
            const result = day10Part2(puzzle)

            // then
            expect(result).toBe(2802519786)

        });
    });
})