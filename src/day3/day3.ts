export const calculatePowerConsumption = (binaryReport: string[]): number => {
    const splittenBinaryReport = binaryReport.map(binary => {
        return binary.split('')
    })

    // inverser le tableau pour pouvoir compter efficacement les 0 et 1
    const lengthOfBinary = splittenBinaryReport[0].length
    let invertedSplittenBinaryReport = []
    for (let i=0; i < lengthOfBinary; i++) {
        const column = []
        splittenBinaryReport.forEach(splittenBinary => {
            column.push(splittenBinary[i])
        })
        invertedSplittenBinaryReport.push(column)
    }

    // compte le nombre de 1
    const gammaRateBinarySplitted = invertedSplittenBinaryReport.map((colonne) => {
        let count0 = 0
        let count1 = 0
        colonne.forEach(binary => {
            binary === '0' ? count0++ : count1++
        })

        return count0 > count1 ? '0' : '1'
    })

    const epsilonRateBinarySplitted = invertedSplittenBinaryReport.map((colonne) => {
        let count0 = 0
        let count1 = 0
        colonne.forEach(binary => {
            binary === '0' ? count0++ : count1++
        })

        return count0 < count1 ? '0' : '1'
    })

    const gammaRateBinary = gammaRateBinarySplitted.join('')
    const gammaRate = parseInt(gammaRateBinary, 2)
    const epsilonRateBinary = epsilonRateBinarySplitted.join('')
    const epsilonRate = parseInt(epsilonRateBinary, 2)


    return gammaRate * epsilonRate
}

export const calculatePowerConsumptionAlternative = (binaryReport: string[]): number => {
    const splittenBinaryReport = binaryReport.map(binary => {
        return binary.split('')
    })

    const splittenBinaryReportNumbers = splittenBinaryReport.map((splittenBinaryReportLine) => {
        return splittenBinaryReportLine.map(binaryString => parseInt(binaryString))
    })

    const lengthOfBinary = splittenBinaryReportNumbers[0].length

    const columnSums = []
    for (let i=0; i < lengthOfBinary; i++) {
        let columnSum = 0
        splittenBinaryReportNumbers.forEach(lines => {
            columnSum += lines[i]
        })
        columnSums.push(columnSum)
    }

    const gammaRateBinary = columnSums.map(sum => {
        return sum > binaryReport.length / 2 ? '1' : '0'
    }).join('')
    const epsilonRateBinary = columnSums.map(sum => {
        return sum > binaryReport.length / 2 ? '0' : '1'
    }).join('')

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

    for (let i=0; i < lengthOfBinary; i++) {
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