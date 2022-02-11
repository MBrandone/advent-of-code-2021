import * as fs from "fs"

const transformTxtDataToString = (fileName: string) => {
    let data = ''
    try {
        data = fs.readFileSync(fileName, "utf8")
    } catch (error) {
        console.log(error)
    }
    return data
}

export const transformTxtToArrayOfStrings = (fileName: string): string[] => {
    const data = transformTxtDataToString(fileName)
    return data.split('\n')
}

export const transformTxtToArrayOfNumbers = (fileName: string): number[] => {
    const data = transformTxtDataToString(fileName)
    return data.split('\n').map(measureString => parseInt(measureString))
}

export const extractNumbersAndBoards = (fileName: string) => {
    let data = transformTxtDataToString(fileName)

    const [numberAsString, ...boardsAsString]: string[] = data.split('\n\n')

    const numbers = numberAsString.split(',').map(stringNumber => parseInt(stringNumber))
    const boards = boardsAsString.map(boardAsString => {
        return boardAsString
            .split(/ |\n/)
            .filter(numberAsString => numberAsString !== '')
            .map(numberString => parseInt(numberString))
    })
    return { numbers, boards }
}
