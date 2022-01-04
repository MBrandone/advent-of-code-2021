import _ from "lodash"

export const howManyDotsAfterFold = (initialPresentDots: number[][], instructions: string[]) => {
    type FoldAxis = 'x' | 'y'
    const EMPTY_DOT = '. '
    const FULL_DOT = '#'

    const premiereInstructionDePliX = instructions.find(instruction => {
        const [rest, instructionFoldNumber] = instruction.split('=')
        return rest.split('').at(-1) === 'x'
    })
    const premierPliX = premiereInstructionDePliX && parseInt(premiereInstructionDePliX.split('=')[1])

    const premiereInstructionDePliY = instructions.find(instruction => {
        const [rest, instructionFoldNumber] = instruction.split('=')
        return rest.split('').at(-1) === 'y'
    })
    const premierPliY = premiereInstructionDePliY && parseInt(premiereInstructionDePliY.split('=')[1])

    const maxX = premierPliX ? premierPliX * 2 + 1 : Math.max(...initialPresentDots.map(dotCoordinates => dotCoordinates[0])) + 1
    const maxY = premierPliY ? premierPliY * 2 + 1 : Math.max(...initialPresentDots.map(dotCoordinates => dotCoordinates[1])) + 1

    // faire la grille vide
    const emptyLine = Array.apply(null, Array(maxX)).map(_ => EMPTY_DOT)
    const initialGrid = Array.apply(null, Array(maxY)).map(() => _.cloneDeep(emptyLine))

    // remplir la grille
    let updatedGrid = _.cloneDeep(initialGrid)
    initialPresentDots.forEach(initialPresentDot => {
        const initialPresentDotX = initialPresentDot[0]
        const initialPresentDotY = initialPresentDot[1]
        updatedGrid[initialPresentDotY][initialPresentDotX] = FULL_DOT
    })

    // Faire l'instruction
    instructions.forEach(instruction => {
        const [rest, foldAxisNumberAsString] = instruction.split('=')

        const foldAxisNumber = parseInt(foldAxisNumberAsString)
        const foldAxis = rest.slice(rest.length - 1)

        if (foldAxis === 'y') {
            updatedGrid = updatedGrid.map((line, yIndex) => {
                // Bon côté du pli
                if (yIndex < foldAxisNumber) {
                    const newLine = line.map((dot, xIndex) => {
                        const currentDot = dot
                        const oppositeDot = updatedGrid[updatedGrid.length - (yIndex + 1)][xIndex]
                        if ([currentDot, oppositeDot].includes(FULL_DOT))
                            return FULL_DOT
                        return EMPTY_DOT
                    })

                    return newLine
                }
                // autre côté du pli
                else {
                    return undefined
                }
            })

            updatedGrid = updatedGrid.slice(0, foldAxisNumber)
        } else {
            updatedGrid = updatedGrid.map((line, yIndex) => {
                const newLine = line.map((dot, xIndex) => {
                    // Bon côté du pli
                    if (xIndex < foldAxisNumber) {
                        const currentDot = dot
                        const oppositeDot = updatedGrid[yIndex][line.length - 1 - xIndex]
                        if ([currentDot, oppositeDot].includes(FULL_DOT))
                            return FULL_DOT
                        return EMPTY_DOT
                    }
                    // Mauvais côté du pli
                    else {
                        return undefined
                    }
                })
                return newLine
            })

            updatedGrid = updatedGrid.map(line => {
                return line.slice(0, foldAxisNumber)
            })
        }
    })


    const howManyFullDots = updatedGrid.reduce((sum, currentLine) => {
       const lineSum = currentLine.reduce((lineSum, currentDot) => {
           if (currentDot === FULL_DOT)
               lineSum++
           return lineSum
       }, 0)
       return lineSum + sum
    }, 0)

    return {
        howManyFullDots,
        grid: updatedGrid
    }
}
