// Pour faire mieux
// lettersCount doit être initialisé grâce aux regles d'insertions et pas a la main
export const day14 = (polymerTemplate: string, pairInsertionsRules: string[][], STEP_TO_COUNT) => {
    const FIRST_STEP = 1
    const TUPLES_TO_MODIFY = pairInsertionsRules.map(insertionRule => insertionRule[0])

    const lettersCount = {
        B: 0,
        C: 0,
        H: 0,
        N: 0,
        K: 0,
        F: 0,
        S: 0,
        P: 0,
        V: 0,
        O: 0
    }

    let tuplesCount = {}
    for (let i = 0; i < polymerTemplate.length - 1; i++) {
        const spottedTuple = polymerTemplate.substr(i, 2)
        if (tuplesCount[spottedTuple] !== undefined)
            tuplesCount[spottedTuple] = tuplesCount[spottedTuple] + 1
        else
            tuplesCount[spottedTuple] = 1
    }


    polymerTemplate.split('').forEach(letter => {
        lettersCount[letter] = lettersCount[letter] + 1
    })

    for (let i = FIRST_STEP; i<= STEP_TO_COUNT; i++) {
        const newTuples = {}

        const presentsTuples = Object.keys(tuplesCount)

        presentsTuples.forEach(tuple => {
            if (TUPLES_TO_MODIFY.includes(tuple)) {
                const insertionRule = pairInsertionsRules.find(insertionRule => insertionRule[0] === tuple)
                const [firstLetter, secondLetter] = insertionRule[0].split('')
                const firstTupleToInsert = firstLetter + insertionRule[1]
                const secondTupleToInsert = insertionRule[1] + secondLetter
                const tuplesToInsert = [firstTupleToInsert, secondTupleToInsert]

                lettersCount[insertionRule[1]] = lettersCount[insertionRule[1]] + tuplesCount[tuple]

                tuplesToInsert.forEach(tupleToInsert => {
                    if (newTuples[tupleToInsert] !== undefined)
                        newTuples[tupleToInsert] = newTuples[tupleToInsert] + tuplesCount[tuple]
                    else
                        newTuples[tupleToInsert] = tuplesCount[tuple]
                })

            }
        })

        tuplesCount = newTuples
    }

    const lettersAppearance = Object.values(lettersCount).filter(value => value > 0) as number[]

    const maxAppearance = Math.max(...lettersAppearance)
    const minAppearance = Math.min(...lettersAppearance)

    return {
        tuplesCount,
        lettersCount,
        differenceMaxMinAppearance : maxAppearance - minAppearance
    }
}