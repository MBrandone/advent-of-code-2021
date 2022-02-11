/*
- [X] Sortir la transfo de fichier vers les utils
- [ ] Créer objet qui définit le gagnant et perdant et resultat (On ne veut pas de let)
- [ ] Donner direct un tableau de tableau pour les board plutot que juste un tableau => ça facilite la description des lignes et colonnes
- [ ] Fixer la version de node du projet => Il m'a fait chier avec Array.at'
- [ ] Faire les refacto globale
* */

import { extractNumbersAndBoards } from "../parsers"

interface BoardDescription {
    atLeastOneLineOrColumnComplete: (drawnNumbers: number[]) => boolean
    sumOfNotDrawnNumbers: (drawnNumbers: number[]) => number
}

export class Board implements BoardDescription {
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

    atLeastOneLineOrColumnComplete(drawnNumbers: number[]): boolean {
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

interface BingoGame {
    whoIsTheFirstWinner: () => Board
    whoIsTheLastWinner: () => Board
    drawNumber: (drawnNumber: number) => void
    getNumberWhichProvocVictory: () => number
}

class Bingo implements BingoGame {
    private drawnNumbers: number[] = []
    private drawnNumberWhichProvocVictory: number | undefined
    private drawnNumberWhichProvocLastVictory: number | undefined

    constructor(private boards: Board[]) {}

    whoIsTheFirstWinner(): Board | null {
        return this.boards.find(board => board.atLeastOneLineOrColumnComplete(this.drawnNumbers));
    }

    whoIsTheLastWinner(): Board | null {
        if (this.howManyPeopleHasNotWon() === 1) {
            const looserIndex = this.boards
                .map(board => board.atLeastOneLineOrColumnComplete(this.drawnNumbers))
                .findIndex(doesWin => doesWin === false)
            return this.boards[looserIndex]
        }

        return null
    }

    drawNumber(drawnNumber: number): void {
        this.drawnNumbers.push(drawnNumber)

        if (!this.drawnNumberWhichProvocVictory && this.whoIsTheFirstWinner())
            this.drawnNumberWhichProvocVictory = drawnNumber

        if (!this.drawnNumberWhichProvocLastVictory && this.howManyPeopleHasNotWon() === 0)
            this.drawnNumberWhichProvocLastVictory = drawnNumber
    }

    getNumberWhichProvocVictory(): number {
        return this.drawnNumberWhichProvocVictory;
    }

    getDrawnNumbers(): number[] {
        return this.drawnNumbers
    }

    getNumberWhichProvocLastVictory(): number {
        return this.drawnNumberWhichProvocLastVictory
    }

    private howManyPeopleHasNotWon() : number {
        const loosingBoards = this.boards.map(board => board.atLeastOneLineOrColumnComplete(this.drawnNumbers))
        return loosingBoards.filter(doesWin => doesWin === false).length
    }

}

export const whoIsTheWinner = (drawnNumbers: number[], boards: number[][]): number => {
    const realBoards: Board[] = boards.map(board => new Board(board))
    const bingoGame = new Bingo(realBoards)

    let winnerNew: Board

    drawnNumbers.every((drawnNumber, index) => {
        bingoGame.drawNumber(drawnNumber)
        winnerNew = bingoGame.whoIsTheFirstWinner()

        return !winnerNew;
    })

    return bingoGame.getNumberWhichProvocVictory() * winnerNew.sumOfNotDrawnNumbers(bingoGame.getDrawnNumbers())
}

export const whoIsTheLooser = (sortedNumbers: number[], boards: number[][]): number => {
    const realBoards: Board[] = boards.map(board => new Board(board))
    const bingoGame = new Bingo(realBoards)

    let looserBoard: Board

    sortedNumbers.every((sortedNumber, index) => {
        bingoGame.drawNumber(sortedNumber)

        if (bingoGame.whoIsTheLastWinner()) {
            looserBoard = bingoGame.whoIsTheLastWinner()
        }

        return bingoGame.getNumberWhichProvocLastVictory() === undefined;
    })

    return bingoGame.getNumberWhichProvocLastVictory() * looserBoard.sumOfNotDrawnNumbers(bingoGame.getDrawnNumbers())
}

export const part1 = (fileName: string) => {
    const { numbers, boards } = extractNumbersAndBoards(fileName)
    return whoIsTheWinner(numbers, boards)
}

export const part2 = (fileName: string) => {
    const { numbers, boards } = extractNumbersAndBoards(fileName)
    return whoIsTheLooser(numbers, boards)
}