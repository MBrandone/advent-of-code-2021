export const whatIsMinimumFuelForCrabsToAlign = (initialPosition: number[]) => {
    // calculate fuel needed for each positions
    const maxPosition = Math.max(...initialPosition)
    const fuelNeededForEachPosition = []
    for (let possibleTargetPosition = 0; possibleTargetPosition < maxPosition; possibleTargetPosition++) {
        const fuelNeededForThisPosition = initialPosition.map(position => {
            return Math.abs(position - possibleTargetPosition)
        })
        fuelNeededForEachPosition.push(fuelNeededForThisPosition.reduce((acc, curr) => acc + curr, 0))
    }

    // take the minimum
    return Math.min(...fuelNeededForEachPosition)
}

export const whatIsMinimumFuelForCrabsToAlignWithNewStrategy = (initialPosition: number[]) => {
    // calculate fuel needed for each positions
    const maxPosition = Math.max(...initialPosition)
    const fuelNeededForEachPosition = []
    for (let possibleTargetPosition = 0; possibleTargetPosition < maxPosition; possibleTargetPosition++) {
        const fuelNeededForThisPosition = initialPosition.map(position => {
            const distance = Math.abs(position - possibleTargetPosition)
            return (distance * (distance+1)) / 2;
        })
        fuelNeededForEachPosition.push(fuelNeededForThisPosition.reduce((acc, curr) => acc + curr, 0))
    }

    // take the minimum
    return Math.min(...fuelNeededForEachPosition)
}