export const howManyTimesDepthIncrease = (measurements: number[]): number => {
    const increasedArray = measurements.map((measured, index) => {
        if (index > 0) {
            return measured > measurements[index - 1] ? 'INCREASE' : 'DECREASE'
        }
        return 'NOTHING'
    })

    const increasedOnly = increasedArray.filter(measured => measured === 'INCREASE')

    return increasedOnly.length
}

export const howManyTimesDepthIncreaseWithWindows = (measurements: number[]): number => {
    const windowMeasurments = measurements.map((measure, index) => {
        if (measurements[index + 1] && measurements[index + 2])
            return measure + measurements[index + 1] + measurements[index + 2]
        return undefined
    })

    const increasedArray = windowMeasurments.map((measured, index) => {
        if (index > 0) {
            if (measured > windowMeasurments[index - 1])
                return 'INCREASE'
            else if (measured === windowMeasurments[index - 1])
                return 'NO_CHANGES'
            else
                return 'DECREASE'
        }
        return 'NO_CALCUL_POSSIBLE'
    })

    const increasedOnly = increasedArray.filter(measured => measured === 'INCREASE')

    return increasedOnly.length
}