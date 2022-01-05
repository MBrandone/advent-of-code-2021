import { transformTxtToArrayOfNumbers, transformTxtToArrayOfStrings } from "./index"

const examplePuzzleStringFilePath = 'src/parsers/examplePuzzleString.txt'
const examplePuzzleNumbersFilePath = 'src/parsers/examplePuzzleNumbers.txt'

describe('parser', () => {
    describe('txt to array of strings', () => {
        test('transform txt to array', () => {
            const result = transformTxtToArrayOfStrings(examplePuzzleStringFilePath)

            expect(result).toEqual(expect.arrayContaining([
                'forward 5',
                'down 5',
                'forward 8',
                'up 3',
                'down 8',
                'forward 2',
            ]))
        })
    })

    describe('txt to array of numbers', () => {
        test('transform txt to array', () => {
            const result = transformTxtToArrayOfNumbers(examplePuzzleNumbersFilePath)

            expect(result).toEqual(expect.arrayContaining([199, 200, 208, 210, 200, 207, 240, 269, 260, 263]))
        })
    })
})
