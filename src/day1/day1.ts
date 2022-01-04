import * as fs from "fs";

const INITIAL_COUNT = 0

export const transformTxtToArray = (fileName: string): number[] => {
    let data = ''
    try {
        data = fs.readFileSync(fileName, "utf8")
    } catch (error) {
        console.log(error);
    }
    return data.split('\n').map(measureString => parseInt(measureString))
}

const countHowManyTimesItIncreases = (timesItIncrease: number, currentMeasure: number, index: number, measurements: number[]): number => {
    if (measurements[index - 1] && currentMeasure > measurements[index - 1]) {
        timesItIncrease++
    }

    return timesItIncrease
}

const addCurrentAndTwoNextMeasurements = (currentMeasure: number, index: number, measurements: number[]): number => {
    const nextMeasure = measurements[index + 1];
    const secondNextMeasure = measurements[index + 2];
    return currentMeasure + nextMeasure + secondNextMeasure
}

export const howManyTimesDepthIncrease = (measurements: number[]): number => {
    return measurements.reduce(countHowManyTimesItIncreases, INITIAL_COUNT)
}

export const howManyTimesDepthIncreaseWithWindows = (measurements: number[]): number => {
    return measurements
        .map(addCurrentAndTwoNextMeasurements)
        .filter(windowMeasurement => windowMeasurement !== undefined)
        .reduce(countHowManyTimesItIncreases, INITIAL_COUNT)
}

export const day1Part1 = (puzzleFileName: string) => {
    const measurements = transformTxtToArray(puzzleFileName)
    return howManyTimesDepthIncrease(measurements)
}

export const day1Part2 = (puzzleFileName: string) => {
    const measurements = transformTxtToArray(puzzleFileName)
    return howManyTimesDepthIncreaseWithWindows(measurements)
}

// console.log(day1Part1('src/day1/realPuzzle.txt'))
// console.log(day1Part2('src/day1/realPuzzle.txt'))
