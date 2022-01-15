/*
- [ ] Sortir la transfo de fichier vers les utils
- [ ] Créer objet qui défint le gagnant et perdant et resultat (On ne veut pas de let)
- [ ] Donner direct un tableau de tableau pour les board plutot que juste un tableau => ça facilite la description des lignes et colonnes
- [ ] Fixer la version de node du projet => Il m'a fait chier avec Array.at'
- [ ] Faire les refacto globale
* */

import * as fs from "fs"

interface BoardRules {
    winWithNumbers: (sortedNumbers: number[]) => boolean
    sumOfNotDrawnNumbers: (sortedNumbers: number[]) => number
}

export class Board implements BoardRules {
    private columns: number[][] = []
    private lines: number[][] = []

    constructor(
        private boardNumbers: number[]
    ) {
        const linesAndColumnsLength = Math.sqrt(boardNumbers.length)

        this.lines = boardNumbers.reduce((lines, currentNumber) => {
            if (lines[lines.length - 1].length === linesAndColumnsLength)
                lines.push([])
            lines[lines.length - 1].push(currentNumber)
            return lines
        }, [[]])

        this.columns = boardNumbers.reduce((columns, currentNumber, index) => {
            const columnIndexToPush = index % linesAndColumnsLength
            if (columns[columnIndexToPush] === undefined) {
                columns[columnIndexToPush] = [] as number[]
            }

            columns[columnIndexToPush].push(currentNumber)
            return columns
        }, [])

    }

    winWithNumbers(drawnNumbers: number[]): boolean {
        const oneLineIsComplete: boolean = this.lines.reduce((oneLineIsComplete, currentLine) => {

            const lineIsComplete = currentLine.reduce((lineIsComplete, currentLineNumber) => {
                if (!drawnNumbers.includes(currentLineNumber)) {
                    return false
                }
                return lineIsComplete
            }, true)

            return lineIsComplete || oneLineIsComplete
        }, false)

        const oneColumnIsComplete: boolean = this.columns.reduce((oneColumnIsComplete, currentColumn) => {
            const columnIsComplete = currentColumn.reduce((columnIsComplete, currentColumnNumber) => {
                if (!drawnNumbers.includes(currentColumnNumber)) {
                    return false
                }
                return columnIsComplete
            }, true)

            return columnIsComplete || oneColumnIsComplete
        }, false)

        return oneLineIsComplete || oneColumnIsComplete
    }

    sumOfNotDrawnNumbers(drawnNumbers: number[]): number {
        return this.boardNumbers.reduce((sumOfNotDrawnNumbers, currentBoardNumber) => {
            if (!drawnNumbers.includes(currentBoardNumber)) {
                sumOfNotDrawnNumbers += currentBoardNumber
            }

            return sumOfNotDrawnNumbers
        }, 0)
    }
}

export const whoIsTheWinner = (sortedNumbers: number[], boards: number[][]): number => {

    const realBoards: Board[] = boards.map(board => new Board(board))

    let sortedNumberWhichProvocVictory: number
    let winnerBoardIndex: number

    sortedNumbers.every((drawnNumber, index) => {
        const drawnNumbers = sortedNumbers.slice(0, index + 1)
        const winningBoards = realBoards.map(board => board.winWithNumbers(drawnNumbers))
        const firstWinningBoard = winningBoards.findIndex(doesWin => doesWin === true)
        const howManyWinner = winningBoards.filter(doesWin => doesWin === true).length

        if (howManyWinner > 0) {
            sortedNumberWhichProvocVictory = drawnNumber
            winnerBoardIndex = firstWinningBoard
            return false
        }

        return true
    })

    const indexDrawnNumberWhenWin = sortedNumbers.findIndex(number => number === sortedNumberWhichProvocVictory)
    const drawnNumbersWhenWin = sortedNumbers.slice(0, indexDrawnNumberWhenWin + 1)

    const sumOfUnmarkedNumberNew = realBoards[winnerBoardIndex].sumOfNotDrawnNumbers(drawnNumbersWhenWin)
    return sortedNumberWhichProvocVictory * sumOfUnmarkedNumberNew
}

export const whoIsTheLooser = (sortedNumbers: number[], boards: number[][]): number => {

    const realBoards: Board[] = boards.map(board => new Board(board))

    let sortedNumberWhichProvocLastWin: number
    let looserBoardIndex: number

    sortedNumbers.every((sortedNumber, index) => {

        const drawnNumbers = sortedNumbers.slice(0, index + 1)
        const loosingBoards = realBoards.map(board => board.winWithNumbers(drawnNumbers))
        const howManyLooser = loosingBoards.filter(doesWin => doesWin === false).length

        if (howManyLooser === 1) {
            looserBoardIndex = loosingBoards.findIndex(doesWin => doesWin === false)
        }

        if (howManyLooser === 0) {
            sortedNumberWhichProvocLastWin = sortedNumber
            return false
        }

        return true

    })

    const indexDrawnNumberWhenLoose = sortedNumbers.findIndex(number => number === sortedNumberWhichProvocLastWin)
    const drawnNumbersWhenLoose = sortedNumbers.slice(0, indexDrawnNumberWhenLoose + 1)

    const sumOfUnmarkedNumberNew = realBoards[looserBoardIndex].sumOfNotDrawnNumbers(drawnNumbersWhenLoose)
    return sortedNumberWhichProvocLastWin * sumOfUnmarkedNumberNew
}

const extractDrawnNumbersAndBoards = (fileName: string) => {
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
    return { numbers, boards }
}

export const part1 = (fileName: string) => {
    const { numbers, boards } = extractDrawnNumbersAndBoards(fileName)
    return whoIsTheWinner(numbers, boards)
}

export const part2 = (fileName: string) => {
    const { numbers, boards } = extractDrawnNumbersAndBoards(fileName)
    return whoIsTheLooser(numbers, boards)
}