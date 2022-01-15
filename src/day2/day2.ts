// Pour améliorer : Un Objet Ship ? instancié avec une strategie de deplacement ? avec une méthode move
// throw error quand une chose est pas respecté ?

import { transformTxtToArrayOfStrings } from "../parsers"

type Position = {
    horizontal: number
    depth: number
    aim: number
}

enum MoveType {
    FORWARD = 'FORWARD',
    UP = 'UP',
    DOWN = 'DOWN',
}

type Move = {
    type: MoveType
    distance: number
}

const enumCorrespondance: { [key: string]: MoveType } = {
    forward: MoveType.FORWARD,
    up: MoveType.UP,
    down: MoveType.DOWN,
}

const INITIAL_POSITION: Position = {
    horizontal: 0,
    depth: 0,
    aim: 0
}

type PositionCalculationStrategy = {
    calculateHorizontalPositionDelta: (move: Move) => number
    calculateDepthDelta: (move: Move, position: Position) => number
    calculateAimDelta?: (move: Move) => number
}

const positionCalculationStrategy1: PositionCalculationStrategy = {
    calculateHorizontalPositionDelta(move: Move): number {
        return move.type === MoveType.FORWARD ? move.distance : 0;
    },
    calculateDepthDelta(move: Move): number {
        return move.type === MoveType.DOWN ? move.distance :
            move.type === MoveType.UP ? -move.distance : 0;
    },
}

const positionCalculationStrategy2: PositionCalculationStrategy = {
    calculateHorizontalPositionDelta(move: Move): number {
        return move.type === MoveType.FORWARD ? move.distance : 0
    },
    calculateDepthDelta(move: Move, position: Position): number {
        return move.type === MoveType.FORWARD ? position.aim * move.distance : 0
    },
    calculateAimDelta(move: Move): number {
        return move.type === MoveType.DOWN ? move.distance :
            move.type === MoveType.UP ? -move.distance : 0
    }
}

const transformTxtToMoves = (puzzleFilePath: string): Move[] => {
    const movements: string[] = transformTxtToArrayOfStrings(puzzleFilePath)
    return movements.map(movement => {
        const [moveType, moveDistanceString] = movement.split(' ')
        return {
            type: enumCorrespondance[moveType],
            distance: parseInt(moveDistanceString)
        }
    })
}

export const calculatePositionAfterMoves = (moves: Move[], positionCalculationStrategy: PositionCalculationStrategy, initialPosition: Position): Position => {
    return moves.reduce((position, currentMovement) => {
        const newHorizontalPosition = position.horizontal + positionCalculationStrategy.calculateHorizontalPositionDelta(currentMovement)
        const newDepthPosition = position.depth + positionCalculationStrategy.calculateDepthDelta(currentMovement, position)

        let aimDelta = 0
        if (position.aim !== undefined && positionCalculationStrategy.calculateAimDelta) {
            aimDelta = positionCalculationStrategy.calculateAimDelta(currentMovement)
        }

        return {
            horizontal: newHorizontalPosition,
            depth: newDepthPosition,
            aim: position.aim + aimDelta
        }
    }, initialPosition)
}

export const part1 = (puzzleFilePath: string): number => {
    const moves: Move[] = transformTxtToMoves(puzzleFilePath)
    const positionAfterMoves = calculatePositionAfterMoves(moves, positionCalculationStrategy1, INITIAL_POSITION)
    return positionAfterMoves.depth * positionAfterMoves.horizontal
}

export const part2 = (puzzleFilePath: string): number => {
    const moves: Move[] = transformTxtToMoves(puzzleFilePath)
    const positionAfterMoves = calculatePositionAfterMoves(moves, positionCalculationStrategy2, INITIAL_POSITION)
    return positionAfterMoves.depth * positionAfterMoves.horizontal
}

// console.log(part1('src/day2/puzzle.txt'))
// console.log(part2('src/day2/puzzle.txt'))