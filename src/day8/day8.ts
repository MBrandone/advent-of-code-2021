export const howManyTimesDigit1Or4Or7Or8Appear = (puzzle: string[][][]) => {

    return puzzle
        .map(tuple => tuple[1])
        .flat()
        .reduce((acc, curr) => {
            return [2, 3, 4, 7].includes(curr.length) ? acc + 1 : acc
        }, 0)

}
enum MappingDigitsNumber {
    'abcefg' = 0,
    'cf' = 1,
    'acdeg' = 2,
    'acdfg' = 3,
    'bcdf' = 4,
    'abdfg' = 5,
    'abdefg' = 6,
    'acf' = 7,
    'abcdefg' = 8,
    'abcdfg' = 9,

}

export const sumOfDecodedNumbers = (puzzle: string[][][]) => {
    // On décode chaque tuple
    const numbersWithMappedDigits = puzzle.map(tuple => {
        const allCryptedNumbers = tuple[0]
        const cryptedNumbersToDetermine = tuple[1]

        // Pour chaque tuple => On determine son mapping
        const mapping = decode(allCryptedNumbers)

        // remplace les lettres dans les cryptedNumbersToDetermine
        const decryptedNumbersToDetermine = cryptedNumbersToDetermine.map(cryptedNumber => {
            return cryptedNumber.replace(/a|b|c|d|e|f|g/gi, (matched) => {
                const inverseMapping = inverse(mapping)
                return inverseMapping[matched]
            })
        })

        // Mettre les decryptedNumber dans l'ordre alphabétique
        const decryptedNumbersToDetermineInAlphabeticalOrder = decryptedNumbersToDetermine.map(digits => {
            return digits.split('').sort().join('')
        });

        // Les remplacer avec les bonnes valeurs de chiffres
        const decryptedNumbers = decryptedNumbersToDetermineInAlphabeticalOrder.map(digits => {
            return MappingDigitsNumber[digits]
        })

        const expectedNumbers = parseInt(decryptedNumbers.join(''))

        return expectedNumbers
    })

    return numbersWithMappedDigits.reduce((acc, curr) => acc + curr, 0)
}

export const decode = (cryptedNumbers: string[]): { a: string; b: string; c: string; d: string; e: string; f: string; g: string } => {

    // cryptedNumbers
    const possibleDigits = ['a', 'b', 'c', 'd', 'e', 'f', 'g',]
    const cryptedOne = cryptedNumbers.filter(digits => digits.length === 2)[0]
    const cryptedFour = cryptedNumbers.filter(digits => digits.length === 4)[0]
    const cryptedSeven = cryptedNumbers.filter(digits => digits.length === 3)[0]
    const cryptedZeroSixNine = cryptedNumbers.filter(digits => digits.length === 6)

    // Pour décoder a => Present dans SEVEN et pas dans ONE
    const AMapping = cryptedSeven.split('').filter(sevenDigit => !cryptedOne.includes(sevenDigit))[0]

    // Pour décoded d et g
    // digit en commun de 2, 5 et 3 (5 digits)
    const cryptedTwoFiveThree = cryptedNumbers.filter(cryptedNumber => cryptedNumber.length === 5)
    const ADGMappings = cryptedTwoFiveThree[0].split('')
        .filter(digit => cryptedTwoFiveThree[1].includes(digit) && cryptedTwoFiveThree[2].includes(digit))
    // puis seul digit en commun avec cryptedFour
    const DMapping = cryptedFour.split('').filter(digit => ADGMappings.includes(digit))[0]
    // On devine G grâce à A et D
    const GMapping = ADGMappings.filter(digit => digit !== AMapping && digit !== DMapping)[0]

    // pour décoder b
    // garder ce qui a dans cryptedFour et pas cryptedOne
    const cryptedBAndD = cryptedFour.split('').filter(digit => !cryptedOne.includes(digit))
    // garder le seul qui n'est pas dans CryptedZero
    const BMapping = cryptedBAndD.filter(digit => digit != DMapping)[0]

    // Pour décoder c
    // garder les digits absent de cryptedZero cryptedSix cryptedNine
    const cryptedCAndDAndE = possibleDigits.filter(digit => !cryptedZeroSixNine[0].includes(digit) || !cryptedZeroSixNine[1].includes(digit) || !cryptedZeroSixNine[2].includes(digit))
    // Pour trouver c, prendre le seul qui est dans cryptedOne
    const CMapping = cryptedCAndDAndE.filter(digit => cryptedOne.includes(digit))[0]

    //Pour décoder f
    // Prendre cryptedOne et enlever le mappedC
    const FMapping = cryptedOne.split('').filter(digit => digit != CMapping)[0]

    // Pour décoder e
    // Prendre le seul digit pas utilisé
    const EMapping = possibleDigits.filter(digit => {
        return digit !== AMapping
        && digit !== BMapping
        && digit !== CMapping
        && digit !== DMapping
        && digit !== FMapping
        && digit !== GMapping
    })[0]

    const mapping = {
        a: AMapping,
        b: BMapping,
        c: CMapping,
        d: DMapping,
        e: EMapping,
        f: FMapping,
        g: GMapping
    }

    return mapping
}


function inverse(obj){
    var retobj = {};
    for(var key in obj){
        retobj[obj[key]] = key;
    }
    return retobj;
}