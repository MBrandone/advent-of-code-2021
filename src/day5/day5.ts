// REFACTO SUGGÉRÉ
// - Actuellement horizontal | vertical n'ont pas la même stratégie de diagonal => Utiliser la même stratégie
// - sortir des Sous Classe Vertical / horizontal / diagonal Wind
// - Autres recos ici : https://www.typescriptlang.org/docs/handbook/2/classes.html#class-members

 class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
     }
 }

class Wind {
    pointA: Point
    pointB: Point

    leftPoint: Point | undefined
    rightPoint: Point | undefined

    constructor(pointA: Point, pointB: Point) {
        this.pointA = pointA
        this.pointB = pointB

        this.leftPoint = pointA.x < pointB.x ? pointA : pointB
        this.rightPoint = pointA.x < pointB.x ? pointB : pointA
    }

    isHorizontal() {
        return this.pointA.y === this.pointB.y
    }

    isVertical() {
        return this.pointA.x === this.pointB.x
    }

    isDiagonal() {
        return !this.isVertical() && !this.isHorizontal()
    }

    isAcending() {
        return this.leftPoint.y > this.rightPoint.y
    }

    isDescending() {
        return this.leftPoint.y < this.rightPoint.y
    }

    pointsOfWinds(): Point[] {
        const points: Point[] = []
        if (this.isAcending()) {
            for (let i=0; i <= this.rightPoint.x - this.leftPoint.x; i++) {
                const newX = this.leftPoint.x + i
                const newY = this.leftPoint.y - i
                const newPoint = new Point(newX, newY)
                points.push(newPoint)
            }
        }

        if (this.isDescending()) {
            for (let i=0; i <= this.rightPoint.x - this.leftPoint.x; i++) {
                const newX = this.leftPoint.x + i
                const newY = this.leftPoint.y + i
                const newPoint = new Point(newX, newY)
                points.push(newPoint)
            }
        }
        return points
    }
}

class WindsAdvertisor {
    diagram: number[][]
    diagonalModeActivated: boolean

    constructor(sideLength, diagonalModeActivated = false) {
        const line = Array.apply(null, Array(sideLength)).map(_ => 0)
        let windsTabs = Array.apply(null, Array(sideLength)).map(_ => line)
        this.diagram = windsTabs
        this.diagonalModeActivated = diagonalModeActivated
    }

    addWind(wind: Wind) {
        if (wind.isHorizontal()) {
            this.diagram = this.diagram.map((windtab, index) => {
                if (index === wind.pointB.y) {
                    const newWindtab = windtab.map((tab, index) => {
                        if ( (wind.pointA.x <= index && index <= wind.pointB.x) || (wind.pointA.x >= index && index >= wind.pointB.x))
                            return tab + 1
                        return tab
                    })

                    return newWindtab
                }
                return windtab
            })
        }

        if (wind.isVertical()) {
            this.diagram = this.diagram.map((windtab, index) => {
                if ((wind.pointA.y <= index && index <= wind.pointB.y) || (wind.pointA.y >= index && index >= wind.pointB.y)) {
                    return windtab.map((tab, index) => index === wind.pointA.x ? tab + 1 : tab)
                }
                return windtab
            })
        }

        if (wind.isDiagonal() && this.diagonalModeActivated) {
            wind.pointsOfWinds().forEach(point => {
                const yToTarget = point.y
                const xToTarget = point.x
                this.diagram = this.diagram.map((windLine, colonneIndex) => {
                    if (colonneIndex === yToTarget)
                        return windLine.map((windValue, index) => {
                            return index === xToTarget ? windValue + 1 : windValue
                        })
                    return windLine
                })
            })
        }
    }

    addWinds(winds: Wind[]) {
        winds.forEach(wind => {
            this.addWind(wind)
        })
    }
}

class ScoreCalculator {
    windsDiagram: number[][]
    constructor(windsDiagram: number[][]) {
        this.windsDiagram = windsDiagram
    }

    howManyTwoOrMoreWindsCross() {
        return this.windsDiagram.reduce((accGloabl, current) => {
            const twoOrMoreWindOverlapOnline = current.reduce((acc, current) => {
                return current > 1 ? acc + 1 : acc
            }, 0)
            return accGloabl + twoOrMoreWindOverlapOnline
        }, 0)
    }
}

const WindMapper = {
    toWinds: (windsAsArray: number[][][]): Wind[] => {
        return windsAsArray.map(wind => {
            const pointA = new Point(wind[0][0], wind[0][1])
            const pointB = new Point(wind[1][0], wind[1][1])
            return new Wind(pointA, pointB)
        })
    }
}

export const howManyTimesWindsCross = (winds: number[][][]) => {

    const mostDistantPointOfWind = Math.max(...winds.flat(2)) + 1
    let windsDiagram = new WindsAdvertisor(mostDistantPointOfWind)

    const convertedWinds = WindMapper.toWinds(winds)
    windsDiagram.addWinds(convertedWinds)

    const scoreCalculator = new ScoreCalculator(windsDiagram.diagram)
    return scoreCalculator.howManyTwoOrMoreWindsCross()
}

export const howManyTimesWindsCrossWithDiagonalWinds = (winds: number[][][]) => {

    const mostDistantPointOfWind = Math.max(...winds.flat(2)) + 1
    let windsDiagram = new WindsAdvertisor(mostDistantPointOfWind, true)

    const convertedWinds = WindMapper.toWinds(winds)
    windsDiagram.addWinds(convertedWinds)

    const scoreCalculator = new ScoreCalculator(windsDiagram.diagram)
    return scoreCalculator.howManyTwoOrMoreWindsCross()
}

