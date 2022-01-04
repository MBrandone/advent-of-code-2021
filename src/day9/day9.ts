// Bon cas pour les itérateurs ?

interface Point {
    x: number
    y: number
    value: number
}

const isLowPointCalculate = (point: Point, puzzle: number[][]): boolean => {
    const { x, y, value } = point

    const isOnBorderTop = puzzle[y - 1] === undefined
    const isOnBorderlBottom = puzzle[y + 1] === undefined
    const isOnVerticalLeft = x === 0
    const isOnVerticalRight = puzzle[y].length - 1 === x

    const isOnTopLeftCorner = isOnBorderTop && isOnVerticalLeft
    const isOnTopRightCorner = isOnBorderTop && isOnVerticalRight
    const isOnBottomLeftCorner = isOnBorderlBottom && isOnVerticalLeft
    const isOnBottomRightCorner = isOnBorderlBottom && isOnVerticalRight

    // corners
    const adjacentRightPoint = puzzle[y][x + 1];
    const adjacentBottomPoint = puzzle[y + 1] && puzzle[y + 1][x];
    const adjacentLeftPoint = puzzle[y][x - 1];
    const adjacentTopPoint = puzzle[y - 1] && puzzle[y - 1][x];

    let isLowPoint = false

    if (isOnTopLeftCorner) {
        if (value < adjacentRightPoint && value < adjacentBottomPoint) {
            isLowPoint = true
        }
    }

    else if (isOnTopRightCorner) {
        if (value < adjacentLeftPoint && value < adjacentBottomPoint) {
            isLowPoint = true
        }
    }

    else if (isOnBottomLeftCorner) {
        if (value < adjacentRightPoint && value < adjacentTopPoint) {
            isLowPoint = true
        }
    }

    else if (isOnBottomRightCorner) {
        if (value < adjacentLeftPoint && value < adjacentTopPoint) {
            isLowPoint = true
        }
    }

    // borders
    else if (isOnBorderTop) {
        if (value < adjacentRightPoint && value < adjacentBottomPoint && value < adjacentLeftPoint) {
            isLowPoint = true
        }
    }

    else if (isOnBorderlBottom) {
        if (value < adjacentRightPoint && value < adjacentTopPoint && value < adjacentLeftPoint) {
            isLowPoint = true
        }
    }

    else if (isOnVerticalLeft) {
        if (value < adjacentRightPoint && value < adjacentTopPoint && value < adjacentBottomPoint) {
            isLowPoint = true
        }
    }

    else if (isOnVerticalRight) {
        if (value < adjacentLeftPoint && value < adjacentTopPoint && value < adjacentBottomPoint) {
            isLowPoint = true
        }
    }
    // else
    else {
        if (value < adjacentLeftPoint && value < adjacentTopPoint && value < adjacentBottomPoint && value < adjacentRightPoint) {
            isLowPoint = true
        }
    }

    return isLowPoint
}

export const whatIsTheSumOfRiskLevelsOfLowPoints = (puzzle: number[][]) => {
    const sumOfRiskLevelsOfLowPoints = puzzle.reduce((sum, line, lineIndex) => {
        const sumOfRiskLevelsOfLowPointsInLine = line.reduce((lineSum, point, colonneIndex, line) => {
            const isLowPoint = isLowPointCalculate({ x: colonneIndex, y: lineIndex, value: point }, puzzle)

            return isLowPoint ? lineSum + point + 1 : lineSum
        }, 0)

        return sum + sumOfRiskLevelsOfLowPointsInLine
    }, 0)

    return sumOfRiskLevelsOfLowPoints
}

const whereAreTheLowPoints = (puzzle: number[][]): Point[] => {
    const lowPoints: Point[] = puzzle.reduce((lowPointsOnPuzzle, line, lineIndex) => {
        const lowPointsOnLine = line.reduce((lowPointsInLine, point, colonneIndex) => {
            const actualPoint = { x: colonneIndex, y: lineIndex, value: point }
            const isLowPoint = isLowPointCalculate(actualPoint, puzzle)
            if (isLowPoint)
                lowPointsInLine.push(actualPoint)

            return lowPointsInLine
        }, [] as Point[])

        return lowPointsOnPuzzle.concat(lowPointsOnLine)
    }, [] as Point[])

    return lowPoints
}

function getAdjacentPointsTo(point: Point, puzzle: number[][]): Point[] {
    const { x, y } = point

    const isOnBorderTop = puzzle[y - 1] === undefined
    const isOnBorderlBottom = puzzle[y + 1] === undefined
    const isOnVerticalLeft = x === 0
    const isOnVerticalRight = puzzle[y].length - 1 === x

    // corners
    const adjacentRightPoint = !isOnVerticalRight && {x: x + 1, y, value: puzzle[y][x + 1]};
    const adjacentBottomPoint = !isOnBorderlBottom && {x, y: y + 1, value: puzzle[y + 1][x]};
    const adjacentLeftPoint = !isOnVerticalLeft && {x: x - 1, y, value: puzzle[y][x - 1]};
    const adjacentTopPoint = !isOnBorderTop && {x, y: y - 1, value: puzzle[y - 1][x]};

    return [adjacentRightPoint, adjacentBottomPoint, adjacentLeftPoint, adjacentTopPoint].filter(point => !!point)
}

export const productOfThreeLargestBasins = (puzzle: number[][]): number => {
    const lowPoints = whereAreTheLowPoints(puzzle)

    const pointsInBasins: number[] = []
    lowPoints.forEach(lowPoint => {
        let pointsInBasin = [lowPoint]
        let pointsToExplore = [lowPoint]

        while(pointsToExplore.length != 0) {
            let newPointsToExplore = []
            pointsToExplore.forEach(point => {
                const adjacentPoints = getAdjacentPointsTo(point, puzzle)

                // Pour qu'il soit explorable => !undefined && !==9 && pas déjà dans la liste des points recensé
                const newAdjacentPointsToExplore = adjacentPoints
                    .filter(point => point.value < 9)
                    .filter(point => {
                        const { x, y } = point
                        let alreadyPresentInBasin = false
                        pointsInBasin.forEach(pointInBasin => {
                            if (pointInBasin.x === x && pointInBasin.y === y) {
                                alreadyPresentInBasin = true
                            }
                        })
                        return !alreadyPresentInBasin
                    })

                pointsInBasin = pointsInBasin.concat(newAdjacentPointsToExplore)
                newPointsToExplore = newPointsToExplore.concat(newAdjacentPointsToExplore)
            })

            pointsToExplore = newPointsToExplore
        }

        pointsInBasins.push(pointsInBasin.length)
    })

    const pointsInBasinsSorted = pointsInBasins.sort((a, b) => b - a)

    return pointsInBasinsSorted[0] * pointsInBasinsSorted[1] * pointsInBasinsSorted[2]
}
