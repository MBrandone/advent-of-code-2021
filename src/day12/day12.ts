enum CaveSize {
    BIG,
    SMALL
}

const startCaveName = 'start'
const endCaveName = 'end'

class Cave {
    private connectedCaves: Cave[] = []

    constructor(public name: string) {
    }

    getSize(): CaveSize {
        return this.name === this.name.toUpperCase() ? CaveSize.BIG : CaveSize.SMALL
    }

    addConnectedCave(cave: Cave): void {
        this.connectedCaves.push(cave)
    }

    getConnectedCaves(): Cave[] {
        return this.connectedCaves
    }
}

class Route {
    constructor(public caves: Cave[] = []) {
    }

    addCave(cave: Cave): Route {
        this.caves.push(cave)
        return this
    }

    getLastVisitedCave(): Cave {
        return this.caves.at(-1)
    }

    alreadyHaveCave(exploringCave: Cave) {
        return this.caves.some(cave => cave.name === exploringCave.name);
    }

    isFinished(): boolean {
        return this.caves.some(cave => cave.name === endCaveName)
    }

    canVisitThisCave(exploringCave: Cave) {
        if (exploringCave.getSize() === CaveSize.BIG){
            return true
        }
        else if (startCaveName === exploringCave.name) {
            return false
        }
        else {
            let smallCaveVisitedTwice = false
            this.caves.every(inspectedCave => {
                let timesItAppears = 0
                this.caves.forEach(comparedCave => {
                    if (inspectedCave === comparedCave) {
                        timesItAppears++
                    }
                })

                if (inspectedCave.getSize() === CaveSize.SMALL && timesItAppears === 2) {
                    smallCaveVisitedTwice = true
                    return false
                }
                return true
            })

            if (smallCaveVisitedTwice) {
                if (this.caves.some(cave => cave.name === exploringCave.name)) {
                    return false
                }
                else {
                    return true
                }

            } else {
                return true
            }
        }
    }
}

export const howManyPaths = (puzzle: string[]) => {
    // Créer le pool de cave
    const availableCaves = puzzle.reduce((caves, links) => {
        const twoConnectedCavesNames = links.split('-')
        twoConnectedCavesNames.forEach(caveName => {
            if (!caves.some(cave => cave.name === caveName)) {
                caves.push(new Cave(caveName))
            }
        })
        return caves
    }, [] as Cave[])

    // Ajouter leurs liens
    puzzle.forEach(links => {
        const [connectedCave1, connectedCave2] = links.split('-')
        availableCaves.find(cave => cave.name === connectedCave1).addConnectedCave(availableCaves.find(cave => cave.name === connectedCave2))
        availableCaves.find(cave => cave.name === connectedCave2).addConnectedCave(availableCaves.find(cave => cave.name === connectedCave1))
    })

    // Créer les trajectoires
    let foundRoutes: Route[] = []
    const startCave = availableCaves.find(cave => cave.name === startCaveName)
    const firstRoute = new Route()
    firstRoute.addCave(startCave)
    let exploratoryRoutes: Route[] = [firstRoute]


    while (exploratoryRoutes.length !== 0) {
        const newRoutesFoundedForCurrentExploratoryRoutes: Route[] = []
        exploratoryRoutes.forEach(route => {
            const lastVisitedCave = route.getLastVisitedCave()
            const cavesToExplore = lastVisitedCave.getConnectedCaves()

            cavesToExplore.forEach(exploringCave => {
                if (exploringCave.getSize() === CaveSize.BIG || !route.alreadyHaveCave(exploringCave)) {
                    const currentCaves = [...route.caves]
                    currentCaves.push(exploringCave)
                    const newRoute = new Route(currentCaves)
                    newRoutesFoundedForCurrentExploratoryRoutes.push(newRoute)

                }
            })
        })

        const routesToContinueToExplore = newRoutesFoundedForCurrentExploratoryRoutes.filter(route => !route.isFinished())
        const finishedRoutes = newRoutesFoundedForCurrentExploratoryRoutes.filter(route => route.isFinished())

        exploratoryRoutes = routesToContinueToExplore
        foundRoutes = foundRoutes.concat(finishedRoutes)
    }

    return foundRoutes.length
}

export const howManyPathsPart2 = (puzzle: string[]) => {
    // Créer le pool de cave
    const availableCaves = puzzle.reduce((caves, links) => {
        const twoConnectedCavesNames = links.split('-')
        twoConnectedCavesNames.forEach(caveName => {
            if (!caves.some(cave => cave.name === caveName)) {
                caves.push(new Cave(caveName))
            }
        })
        return caves
    }, [] as Cave[])

    // Ajouter leurs liens
    puzzle.forEach(links => {
        const [connectedCave1, connectedCave2] = links.split('-')
        availableCaves.find(cave => cave.name === connectedCave1).addConnectedCave(availableCaves.find(cave => cave.name === connectedCave2))
        availableCaves.find(cave => cave.name === connectedCave2).addConnectedCave(availableCaves.find(cave => cave.name === connectedCave1))
    })

    // Créer les trajectoires
    let foundRoutes: Route[] = []
    const startCave = availableCaves.find(cave => cave.name === startCaveName)
    const firstRoute = new Route()
    firstRoute.addCave(startCave)
    let exploratoryRoutes: Route[] = [firstRoute]

    while (exploratoryRoutes.length !== 0) {
        const newRoutesFoundedForCurrentExploratoryRoutes: Route[] = []
        exploratoryRoutes.forEach(route => {
            const lastVisitedCave = route.getLastVisitedCave()
            const cavesToExplore = lastVisitedCave.getConnectedCaves()

            cavesToExplore.forEach(exploringCave => {
                if (route.canVisitThisCave(exploringCave)) {
                    const currentCaves = [...route.caves]
                    currentCaves.push(exploringCave)
                    const newRoute = new Route(currentCaves)
                    newRoutesFoundedForCurrentExploratoryRoutes.push(newRoute)
                }
            })
        })

        const routesToContinueToExplore = newRoutesFoundedForCurrentExploratoryRoutes.filter(route => !route.isFinished())
        const finishedRoutes = newRoutesFoundedForCurrentExploratoryRoutes.filter(route => route.isFinished())

        exploratoryRoutes = routesToContinueToExplore
        foundRoutes = foundRoutes.concat(finishedRoutes)
    }

    return foundRoutes.length
}