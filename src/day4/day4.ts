// Essayer de ne plus avoir de let
// essayer avec la pro fonctionnelles

// essayer avec des iterables

// fixer la version de node du projet
// => Il m'a fait chier avec Array.at'

import * as fs from "fs"

const checkMark = "X"
const openMark = "O"
type CheckMark = "X"
type OpenMark = "O"
type Mark = CheckMark | OpenMark
type Board = number[]
type CheckedBoard = Mark[]

const calculateLinesIndexes = (howManyNumbers: number) => {
    return Array.from(Array(howManyNumbers)).reduce((acc: number[][], current, index) => {
        if (acc[acc.length - 1].length === Math.sqrt(howManyNumbers))
            acc.push([])
        acc[acc.length - 1].push(index)
        return acc
    }, [[]])
}

const calculateColumnsIndexes = (howManyNumbers) => {
    let linesAndColumnsLength = Math.sqrt(howManyNumbers)

    return Array.from(Array(howManyNumbers)).reduce((acc: number[][], current, index) => {
        if (acc[acc.length - 1].length === linesAndColumnsLength)
            acc.push([])

        const columnNumber = acc.length - 1
        const indexToAdd = (index % linesAndColumnsLength) * linesAndColumnsLength + columnNumber
        acc[acc.length - 1].push(indexToAdd)
        return acc
    }, [[]])
}

const transformToBoardsWithOpenMarks = (boards) => {
    return boards.map(board => {
        return board.map(_ => openMark)
    })
}

const calculateSumOfUnmarkedNumber = (winnerBoard, winnerBoardChecked) => {
    return winnerBoard.reduce((score, currentNumber, index) => {
        if (winnerBoardChecked[index] === openMark) {
            score += currentNumber
        }
        return score
    }, 0);
}

export const whoIsTheWinner = (sortedNumbers: number[], boards: Board[]): number => {

    const howManyNumbers = boards[0].length
    let sortedNumberWhichProvocVictory: number
    let winnerBoard: Board
    let winnerBoardChecked: CheckedBoard
    let winnerBoardIndex: number

    let checkedBoards: CheckedBoard[] = transformToBoardsWithOpenMarks(boards)
    const linesIndexes = calculateLinesIndexes(howManyNumbers)
    const columnsIndexes = calculateColumnsIndexes(howManyNumbers)

    // check which sortedNumber provoc victory
    sortedNumbers.every(sortedNumber => {

        checkedBoards = checkedBoards.map((checkedBoard, checkedBoardIndex) => {
            return checkedBoard.map((mark, positionIndex) => {
                if (sortedNumber === boards[checkedBoardIndex][positionIndex])
                    return checkMark
                return mark
            })
        })

        checkedBoards.every((checkedBoard, checkedBoardIndex) => {

            const verifyThereIsOnlyCheckMarksForPassedIndexes = (acc, current, index) => {
                const checkMarkOnIndexes = current.map(index => {
                        return checkedBoard[index]
                })

                return acc || !checkMarkOnIndexes.includes(openMark)
            }

            const atLeastOneCompleteLine = linesIndexes.reduce(verifyThereIsOnlyCheckMarksForPassedIndexes, false)
            const atLeastOneCompleteColumn = columnsIndexes.reduce(verifyThereIsOnlyCheckMarksForPassedIndexes, false)

            if (atLeastOneCompleteLine || atLeastOneCompleteColumn) {
                winnerBoardIndex = checkedBoardIndex
                return false
            }

            return true
        })

        sortedNumberWhichProvocVictory = sortedNumber

        return !(winnerBoardIndex === 0 || winnerBoardIndex > 0);

    })

    winnerBoard = boards[winnerBoardIndex]
    winnerBoardChecked = checkedBoards[winnerBoardIndex]

    // score
    const sumOfUnmarkedNumber = calculateSumOfUnmarkedNumber(winnerBoard, winnerBoardChecked)
    const score = sortedNumberWhichProvocVictory * sumOfUnmarkedNumber
    return score
}

export const whoIsTheLooser = (sortedNumbers: number[], boards: Board[]): number => {

    const howManyNumbers = boards[0].length
    let sortedNumberWhichProvocLoose: number
    let looserBoard: Board
    let looserBoardChecked: CheckedBoard
    let looserBoardIndex: number

    let checkedBoards: CheckedBoard[] = transformToBoardsWithOpenMarks(boards)
    const linesIndexes = calculateLinesIndexes(howManyNumbers)
    const columnsIndexes = calculateColumnsIndexes(howManyNumbers)

    sortedNumbers.every((sortedNumber) => {

        checkedBoards = checkedBoards.map((checkedBoard, checkedBoardIndex) => {
            return checkedBoard.map((mark, positionIndex) => {
                if (sortedNumber === boards[checkedBoardIndex][positionIndex])
                    return checkMark
                return mark
            })
        })

        // déterminer qui est le dernier perdant
        let winners = []
        let loosers = []
        checkedBoards.forEach((checkedBoard, checkedBoardIndex) => {

            const verifyThereIsOnlyCheckMarksForPassedIndexes = (acc, current, index) => {
                const checkMarkOnIndexes = current.map(index => {
                    return checkedBoard[index]
                })

                return acc || !checkMarkOnIndexes.includes(openMark)
            }

            const atLeastOneCompleteLine = linesIndexes.reduce(verifyThereIsOnlyCheckMarksForPassedIndexes, false)
            const atLeastOneCompleteColumn = columnsIndexes.reduce(verifyThereIsOnlyCheckMarksForPassedIndexes, false)

            if (atLeastOneCompleteLine || atLeastOneCompleteColumn) {
                winners.push(checkedBoardIndex)
            } else {
                loosers.push(checkedBoardIndex)
            }

        })

        if (loosers.length === 1) {
            looserBoardIndex = loosers[0]
        }

        if (loosers.length === 0) {
            sortedNumberWhichProvocLoose = sortedNumber
            return false
        }

        return true
    })

    looserBoard = boards[looserBoardIndex]
    looserBoardChecked = checkedBoards[looserBoardIndex]

    let sumOfUnmarkedNumber = calculateSumOfUnmarkedNumber(looserBoard, looserBoardChecked)

    return sortedNumberWhichProvocLoose * sumOfUnmarkedNumber
}

export const part1 = (fileName: string) => {
    let data = ''
    try {
        data = fs.readFileSync(fileName, "utf8")
    } catch (error) {
        console.log(error)
    }

    const [numberAsString, ...boardsAsString]: string[] = data.split('\n\n')

    const numbers = numberAsString.split(',').map(stringNumber => parseInt(stringNumber))
    const boards = boardsAsString.map(boardAsString => {
        return boardAsString
            .split(/ |\n/)
            .filter(numberAsString => numberAsString !== '')
            .map(numberString => parseInt(numberString))
    })

    return whoIsTheWinner(numbers, boards)
}

export const part2 = (fileName: string) => {
    let data = ''
    try {
        data = fs.readFileSync(fileName, "utf8")
    } catch (error) {
        console.log(error)
    }

    const [numberAsString, ...boardsAsString]: string[] = data.split('\n\n')

    const numbers = numberAsString.split(',').map(stringNumber => parseInt(stringNumber))
    const boards = boardsAsString.map(boardAsString => {
        return boardAsString
            .split(/ |\n/)
            .filter(numberAsString => numberAsString !== '')
            .map(numberString => parseInt(numberString))
    })
    return whoIsTheLooser(numbers, boards)
}