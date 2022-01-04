class Octopus {
    constructor(
        public x: number,
        public y: number,
        public energy: number
    ) {
    }
}

export const day11 = (puzzle: number[][]) => {
    const MINIMUM_ENERGY = 0
    const MINIM_ENERGY_T0_FLASH = 9
    const STEPS_TO_COUNT = 100
    const GRID_MINIMUM_POSITION = 0
    const GRID_MAXIMUM_POSITION = 9
    const INITIAL_NUMBER_OF_FLASHES = 0;

    let numberOfFlashes = INITIAL_NUMBER_OF_FLASHES
    let updatedGrid = puzzle
    const steps = Array.apply(null, Array(STEPS_TO_COUNT)).map((x, i) => i + 1)

    steps.forEach(step => {
        let octopusesThatFlashAtThisStep: Octopus[] = []

        // A => Ajouter 1 à chaque numéro
        updatedGrid = updatedGrid.map(octopusLine => {
            return octopusLine.map(octopusEnergy => octopusEnergy + 1)
        })

        // B => récupérer toutes celles qui ont 9
        octopusesThatFlashAtThisStep = updatedGrid.reduce((octopuses, octopusLine, yIndex) => {
            const octopusesWhichFlashOnCurrentLine = octopusLine.reduce((octopuses, currentEnergy, xIndex) =>  {
                if (currentEnergy > MINIM_ENERGY_T0_FLASH) {
                    octopuses.push(new Octopus(xIndex, yIndex, currentEnergy))
                }
                return octopuses
            }, [] as Octopus[])
            return octopuses.concat(octopusesWhichFlashOnCurrentLine)
        }, [] as Octopus[])


        // B => Toutes ceux qui ont 9 => Ajouter un autour => continuer jusqu'à plus aucune
        let octopusesToCountForSideFlashing = octopusesThatFlashAtThisStep
        while (octopusesToCountForSideFlashing.length !== 0) {

            const octopusToIncreaseEnergy = octopusesToCountForSideFlashing.reduce((octopuses, currentFlashingOctopus) => {
                const octopusesToIncreaseEnergyDueToCurrentFlashingOctopus: Octopus[] = []
                for (let deltaX = -1; deltaX <= 1; deltaX++) {
                    for (let deltaY = -1; deltaY <= 1; deltaY++) {
                        if (
                            (deltaX !== 0 || deltaY !== 0)
                            && currentFlashingOctopus.x + deltaX >= GRID_MINIMUM_POSITION
                            && currentFlashingOctopus.x + deltaX <= GRID_MAXIMUM_POSITION
                            && currentFlashingOctopus.y + deltaY >= GRID_MINIMUM_POSITION
                            && currentFlashingOctopus.y + deltaY <= GRID_MAXIMUM_POSITION
                        ) {
                            const octopusToIncreaseX = currentFlashingOctopus.x + deltaX
                            const octopusToIncreaseY = currentFlashingOctopus.y + deltaY
                            const octopusToIncreaseEnergy = updatedGrid[octopusToIncreaseY][octopusToIncreaseX]
                            octopusesToIncreaseEnergyDueToCurrentFlashingOctopus.push(new Octopus(octopusToIncreaseX, octopusToIncreaseY, octopusToIncreaseEnergy))
                        }
                    }
                }
                return octopuses.concat(octopusesToIncreaseEnergyDueToCurrentFlashingOctopus)
            }, [] as Octopus[])


            octopusToIncreaseEnergy.forEach(octopus => {
                updatedGrid[octopus.y][octopus.x] = updatedGrid[octopus.y][octopus.x] + 1
            })

            // STEP 3 => Compter celles qui sont >= 9
            let newOctupusWhichFlash = []
            updatedGrid.forEach((octopusLine, yIndex) => {
                octopusLine.forEach((energy, xIndex) => {
                    if (energy > MINIM_ENERGY_T0_FLASH
                        && !octopusesThatFlashAtThisStep.some(octopus => octopus.x === xIndex && octopus.y === yIndex)
                    ) {
                        newOctupusWhichFlash.push(new Octopus(xIndex, yIndex, energy))
                    }
                })
            })

            // Recommencer le process avec celles qui ont entrainé un flash
            octopusesThatFlashAtThisStep = octopusesThatFlashAtThisStep.concat(newOctupusWhichFlash)
            octopusesToCountForSideFlashing = newOctupusWhichFlash

        }

        // STEP 4 => Reinit à 0
        updatedGrid = updatedGrid.map(octopusLine => {
            return octopusLine.map(energy => energy > 9 ? 0 : energy)
        })

        // Compte le nombre de flash à ce step
        numberOfFlashes += octopusesThatFlashAtThisStep.length

    })

    return numberOfFlashes
}

export const day11Part2 = (puzzle: number[][]) => {
    const MINIMUM_ENERGY = 0
    const MINIM_ENERGY_T0_FLASH = 9
    const STEPS_TO_COUNT = 1000
    const GRID_MINIMUM_POSITION = 0
    const GRID_MAXIMUM_POSITION = 9
    let stepWhenAllFlashes: number

    let updatedGrid = puzzle
    const steps = Array.apply(null, Array(STEPS_TO_COUNT)).map((x, i) => i + 1)

    steps.every(step => {
        let octopusesThatFlashAtThisStep: Octopus[] = []

        // A => Ajouter 1 à chaque numéro
        updatedGrid = updatedGrid.map(octopusLine => {
            return octopusLine.map(octopusEnergy => octopusEnergy + 1)
        })

        // B => récupérer toutes celles qui ont 9
        octopusesThatFlashAtThisStep = updatedGrid.reduce((octopuses, octopusLine, yIndex) => {
            const octopusesWhichFlashOnCurrentLine = octopusLine.reduce((octopuses, currentEnergy, xIndex) =>  {
                if (currentEnergy > MINIM_ENERGY_T0_FLASH) {
                    octopuses.push(new Octopus(xIndex, yIndex, currentEnergy))
                }
                return octopuses
            }, [] as Octopus[])
            return octopuses.concat(octopusesWhichFlashOnCurrentLine)
        }, [] as Octopus[])


        // B => Toutes ceux qui ont 9 => Ajouter un autour => continuer jusqu'à plus aucune
        let octopusesToCountForSideFlashing = octopusesThatFlashAtThisStep
        while (octopusesToCountForSideFlashing.length !== 0) {

            const octopusToIncreaseEnergy = octopusesToCountForSideFlashing.reduce((octopuses, currentFlashingOctopus) => {
                const octopusesToIncreaseEnergyDueToCurrentFlashingOctopus: Octopus[] = []
                for (let deltaX = -1; deltaX <= 1; deltaX++) {
                    for (let deltaY = -1; deltaY <= 1; deltaY++) {
                        if (
                            (deltaX !== 0 || deltaY !== 0)
                            && currentFlashingOctopus.x + deltaX >= GRID_MINIMUM_POSITION
                            && currentFlashingOctopus.x + deltaX <= GRID_MAXIMUM_POSITION
                            && currentFlashingOctopus.y + deltaY >= GRID_MINIMUM_POSITION
                            && currentFlashingOctopus.y + deltaY <= GRID_MAXIMUM_POSITION
                        ) {
                            const octopusToIncreaseX = currentFlashingOctopus.x + deltaX
                            const octopusToIncreaseY = currentFlashingOctopus.y + deltaY
                            const octopusToIncreaseEnergy = updatedGrid[octopusToIncreaseY][octopusToIncreaseX]
                            octopusesToIncreaseEnergyDueToCurrentFlashingOctopus.push(new Octopus(octopusToIncreaseX, octopusToIncreaseY, octopusToIncreaseEnergy))
                        }
                    }
                }
                return octopuses.concat(octopusesToIncreaseEnergyDueToCurrentFlashingOctopus)
            }, [] as Octopus[])


            octopusToIncreaseEnergy.forEach(octopus => {
                updatedGrid[octopus.y][octopus.x] = updatedGrid[octopus.y][octopus.x] + 1
            })

            // STEP 3 => Compter celles qui sont >= 9
            let newOctupusWhichFlash = []
            updatedGrid.forEach((octopusLine, yIndex) => {
                octopusLine.forEach((energy, xIndex) => {
                    if (energy > MINIM_ENERGY_T0_FLASH
                        && !octopusesThatFlashAtThisStep.some(octopus => octopus.x === xIndex && octopus.y === yIndex)
                    ) {
                        newOctupusWhichFlash.push(new Octopus(xIndex, yIndex, energy))
                    }
                })
            })

            // Recommencer le process avec celles qui ont entrainé un flash
            octopusesThatFlashAtThisStep = octopusesThatFlashAtThisStep.concat(newOctupusWhichFlash)
            octopusesToCountForSideFlashing = newOctupusWhichFlash

        }

        // STEP 4 => Reinit à 0
        updatedGrid = updatedGrid.map(octopusLine => {
            return octopusLine.map(energy => energy > 9 ? 0 : energy)
        })

        const sumOfEnergies = updatedGrid.reduce((sum, octopusLine) => {
            const sumOfLine = octopusLine.reduce((sumOfEnergyOnLine, curr) => {
                return sumOfEnergyOnLine + curr
            }, 0)

            return sum + sumOfLine
        }, 0)

        if (sumOfEnergies === 0) {
            stepWhenAllFlashes = step
            return false
        }
        return true
    })

    return stepWhenAllFlashes
}
