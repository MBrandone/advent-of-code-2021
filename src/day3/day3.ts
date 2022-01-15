import { transformTxtToArrayOfStrings } from "../parsers"

const keepMostPresentValue = numbers => numbers.sort((a, b) => numbers.filter(v => v === a).length - numbers.filter(v => v === b).length).pop()
const keepLessPresentValue = numbers => numbers.sort((a, b) => numbers.filter(v => v === b).length - numbers.filter(v => v === a).length).pop()

const createArrayWithBinaryCharacterGroupedByIndex = (binaryReport: string[]) => {
    const binaryLength = binaryReport[0].split('').length
    return Array.apply(null, Array(binaryLength))
        .map((value, index) => binaryReport.map(binary => binary.split('')).map(binary => binary[index]))
}

const calculatePowerConsumptionAlternative = (binaryReport: string[]): number => {
    const gammaRateBinary = createArrayWithBinaryCharacterGroupedByIndex(binaryReport)
        .map(keepMostPresentValue)
        .join('')

    const epsilonRateBinary = createArrayWithBinaryCharacterGroupedByIndex(binaryReport)
        .map(keepLessPresentValue)
        .join('')

    const gammaRate = parseInt(gammaRateBinary, 2)
    const epsilonRate = parseInt(epsilonRateBinary, 2)

    return gammaRate * epsilonRate
}

export const calculateSupportRating = (binaryReport: string[]): number => {
    const splittenBinaryReport = binaryReport.map(binary => {
        return binary.split('')
    })
    const splittenBinaryReportNumbers = splittenBinaryReport.map((splittenBinaryLine) => {
        return splittenBinaryLine.map(binary => parseInt(binary))
    })

    const lengthOfBinary = splittenBinaryReport[0].length

    let remainingBinariesForOxygenNumbers = splittenBinaryReportNumbers
    let remainingBinariesForOxygen = binaryReport

    let remainingBinariesForCO2Numbers = splittenBinaryReportNumbers
    let remainingBinariesForCO2 = binaryReport

    for (let i = 0; i < lengthOfBinary; i++) {
        let oxygenColumnSum = 0
        remainingBinariesForOxygenNumbers.forEach(lines => {
            oxygenColumnSum += lines[i]
        })
        const oxygenWinnerNumber = oxygenColumnSum >= remainingBinariesForOxygen.length / 2 ? '1' : '0'

        let CO2ColumnSum = 0
        remainingBinariesForCO2Numbers.forEach(lines => {
            CO2ColumnSum += lines[i]
        })
        const CO2WinnerNumber = CO2ColumnSum >= remainingBinariesForCO2.length / 2 ? '1' : '0'

        if (remainingBinariesForOxygenNumbers.length > 1) {
            remainingBinariesForOxygen = remainingBinariesForOxygen.filter(binary => {
                return binary.charAt(i) === oxygenWinnerNumber
            })
            remainingBinariesForOxygenNumbers = remainingBinariesForOxygen.map(binary => {
                return binary.split('')
            }).map((splittenBinaryLine) => {
                return splittenBinaryLine.map(binary => parseInt(binary))
            })
        }
        if (remainingBinariesForCO2Numbers.length > 1) {
            remainingBinariesForCO2 = remainingBinariesForCO2.filter(binary => {
                return binary.charAt(i) !== CO2WinnerNumber
            })

            remainingBinariesForCO2Numbers = remainingBinariesForCO2.map(binary => {
                return binary.split('')
            }).map((splittenBinaryLine) => {
                return splittenBinaryLine.map(binary => parseInt(binary))
            })
        }
    }

    const oxygenGeneratorRating = parseInt(remainingBinariesForOxygen[0], 2)
    const CO2ScrubberRating = parseInt(remainingBinariesForCO2[0], 2)

    return oxygenGeneratorRating * CO2ScrubberRating
}

export const part1 = (filePath: string) => {
    const data = transformTxtToArrayOfStrings(filePath)
    return calculatePowerConsumptionAlternative(data)
}

export const part2 = (filePath: string) => {
    const data = transformTxtToArrayOfStrings(filePath)
    return calculateSupportRating(data)
}