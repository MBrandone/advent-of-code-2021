// Algo de djikstra

class Point {
    public riskFromStartingPoint : number = Infinity
    public pathToReachThisPoint : Point[] = []

    constructor(
        public x: number,
        public y:number,
        public localRisk: number,
        public neighbours: Coordinates[]
    ) {
    }

    setRiskFromStartingPoint(newRiskFromStartingPoint: number) {
        this.riskFromStartingPoint = newRiskFromStartingPoint
        return this;
    }

    setPathToReachThisPoint(path: Point[]) {
        this.pathToReachThisPoint = path
        return this;
    }
}

type Coordinates = {
    x: number,
    y: number,
}

export const riskOfLowerRiskedPath = (riskMap: number[][]) => {
    const MAP_HEIGHT = riskMap.length
    const MAP_WIDTH = riskMap[0].length
    const STARTING_COORDINATES = { x: 0, y: 0 }
    const ENDING_COORDINATES = { x: MAP_WIDTH - 1, y: MAP_HEIGHT - 1 }

    // Creation des points de parcours
    let allNodes: Point[] = riskMap.map((riskLine, yIndex) => {
        return riskLine.map((risk, xIndex) => {
            const coordinatesOfPotentialNeighbours: Coordinates[] = [
                {x: xIndex - 1, y: yIndex},
                {x: xIndex + 1, y: yIndex},
                {x: xIndex, y: yIndex - 1},
                {x: xIndex, y: yIndex + 1},
            ]
            const realNeighbours = coordinatesOfPotentialNeighbours.filter(point => {
                return 0 <= point.x && point.x < MAP_WIDTH && 0 <= point.y && point.y < MAP_HEIGHT
            })

            return new Point(xIndex, yIndex, risk, realNeighbours)
        })
    }).flat()

    // Tout les nodes prennent l'infini en risque depuis le point de dépat, sauf le point de départ qui prend 0
    let unvisitedNodes: Point[] = allNodes.map(point => {
        point.x === STARTING_COORDINATES.x && point.y === STARTING_COORDINATES.y ?
            point.setRiskFromStartingPoint(0) :
            point.setRiskFromStartingPoint(Infinity)
        return point
    })

    // Le noeud de départ est le noeud courant
    let currentNode = unvisitedNodes.find(node => node.x === STARTING_COORDINATES.x && node.y === STARTING_COORDINATES.y)

    // calculer le risque depuis le point de départ pour tout les unvisitedNodes (tous au début)
    while (unvisitedNodes.length !== 0) {
        const currentNeighbours = currentNode.neighbours
        const riskForEachNeighbour = currentNeighbours && currentNeighbours.map((neighbourCoordinates): number => {
            const riskFromStartingNode = currentNode.riskFromStartingPoint
            const riskForThisNeighbour = riskMap[neighbourCoordinates.y][neighbourCoordinates.x]
            return riskFromStartingNode + riskForThisNeighbour
        })

        // Mettre à jour le riskFromStartingPoint et le chemin parcouru de chacun des voisins
        currentNeighbours.forEach((neighbourCoordinates, neighbourIndex) => {
            const nodeToUpdate = allNodes.find(node => node.x === neighbourCoordinates.x && node.y === neighbourCoordinates.y)
            if (riskForEachNeighbour[neighbourIndex] < nodeToUpdate.riskFromStartingPoint) {
                nodeToUpdate.setRiskFromStartingPoint(riskForEachNeighbour[neighbourIndex])
                const pathToReachThisPoint = [...currentNode.pathToReachThisPoint]
                pathToReachThisPoint.push(currentNode)
                nodeToUpdate.setPathToReachThisPoint(pathToReachThisPoint)
            }

        })

        // delete currentNode from unvisited nodes
        unvisitedNodes = unvisitedNodes.filter(node => node.x !== currentNode.x || node.y !== currentNode.y)

        currentNode = unvisitedNodes.length > 0 && unvisitedNodes[0]
    }

    const endPoint = allNodes.find(node => node.x === ENDING_COORDINATES.x && node.y === ENDING_COORDINATES.y)

    return endPoint

}

export const day15Part2 = (initialRiskMap: number[][]) => {
    let realRiskMap = [...initialRiskMap]

    // coller les maps sur les x
    for (let i = 1; i <= 4; i++) {
        const mapToStick = initialRiskMap.map((riskLine, yIndex) => {
          return riskLine.map(risk => {
            return risk + i >= 10 ? (risk + i) % 9 : risk + i
          })
        })

        realRiskMap = realRiskMap.map((riskLine, yIndex) => {
            return riskLine.concat(mapToStick[yIndex])
        })
    }

    const copyOfFirstLineRealMap = [...realRiskMap]

    // collerMap sur les y
    for (let i = 1; i <= 4; i++) {
        const mapToStick = copyOfFirstLineRealMap.map((riskLine, yIndex) => {
            return riskLine.map(risk => {
                return risk + i >= 10 ? (risk + i) % 9 : risk + i
            })
        })

        realRiskMap = realRiskMap.concat(mapToStick)
    }

    const endPoint = riskOfLowerRiskedPath(realRiskMap)

    return endPoint.riskFromStartingPoint
}
