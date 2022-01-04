const OPEN_PARENTHESIS = '('
const CLOSE_PARENTHESIS = ')'

const OPEN_CURLY_BRACKETS = '{'
const CLOSE_CURLY_BRACKETS = '}'

const OPEN_SQUARE_BRACKETS = '['
const CLOSE_SQUARE_BRACKETS = ']'

const OPEN_CARRET = '<'
const CLOSE_CARRET = '>'

const OPENING_CHARACTERS = [OPEN_CARRET, OPEN_PARENTHESIS, OPEN_CURLY_BRACKETS, OPEN_SQUARE_BRACKETS]
const CLOSING_CHARACTERS = [CLOSE_CARRET, CLOSE_PARENTHESIS, CLOSE_CURLY_BRACKETS, CLOSE_SQUARE_BRACKETS]

const SCORING_MAP_ILLEGAL_CHARACTERS = {
    [CLOSE_PARENTHESIS]: 3,
    [CLOSE_SQUARE_BRACKETS]: 57,
    [CLOSE_CURLY_BRACKETS]: 1197,
    [CLOSE_CARRET]: 25137
}

const SCORING_MAP_MISSING_CHARACTERS = {
    [CLOSE_PARENTHESIS]: 1,
    [CLOSE_SQUARE_BRACKETS]: 2,
    [CLOSE_CURLY_BRACKETS]: 3,
    [CLOSE_CARRET]: 4
}

const CLOSING_CHARACTERS_MAP = {
    [OPEN_PARENTHESIS]: CLOSE_PARENTHESIS,
    [OPEN_CURLY_BRACKETS]: CLOSE_CURLY_BRACKETS,
    [OPEN_SQUARE_BRACKETS]: CLOSE_SQUARE_BRACKETS,
    [OPEN_CARRET]: CLOSE_CARRET
}

export const day10 = (puzzle: string[]): number => {
    const illegalCharactersFound: string[] = []

    puzzle.forEach(line => {
        const splittedLine = line.split('')
        const expectedClosingCharacters: string[] = []
        splittedLine.every(character => {
            if (OPENING_CHARACTERS.includes(character)) {
                expectedClosingCharacters.unshift(CLOSING_CHARACTERS_MAP[character])
            }

            if ((CLOSING_CHARACTERS.includes(character))) {
                if (expectedClosingCharacters[0] === character) {
                    expectedClosingCharacters.shift()
                } else {
                    illegalCharactersFound.push(character)
                    return false
                }
            }

            return true
        })
    })



    const scoreOfIllegalsCharacters = illegalCharactersFound.map(character => SCORING_MAP_ILLEGAL_CHARACTERS[character])
    const totalScore = scoreOfIllegalsCharacters.reduce((sum, currentScore) => sum + currentScore, 0)

    return totalScore
}

export const day10Part2 = (puzzle: string[]): number => {
    const endOfLines: string[][] = []

    puzzle.forEach(line => {
        const splittedLine = line.split('')
        const expectedClosingCharacters: string[] = []
        let corruptedLine = false
        splittedLine.forEach(character => {
            if (OPENING_CHARACTERS.includes(character)) {
                expectedClosingCharacters.unshift(CLOSING_CHARACTERS_MAP[character])
            }

            if ((CLOSING_CHARACTERS.includes(character))) {
                if (expectedClosingCharacters[0] === character) {
                    expectedClosingCharacters.shift()
                } else {
                    corruptedLine = true
                }
            }

        })

        if (!corruptedLine) {
            endOfLines.push(expectedClosingCharacters)
        }
    })

    const scoreOfEndOfLines = endOfLines.map(characters => {
        return characters.reduce((score, currentCharacter) => {
            return score * 5 + SCORING_MAP_MISSING_CHARACTERS[currentCharacter]
        }, 0)
    })
     const sortedScoreOfEndOfLines = scoreOfEndOfLines.sort((a, b) => a-b).reverse()
    const middleScore = sortedScoreOfEndOfLines[Math.floor(scoreOfEndOfLines.length/2)]

    return middleScore
}
