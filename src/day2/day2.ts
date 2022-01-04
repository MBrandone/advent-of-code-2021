export const whereIsTheShip = (mouvments: string[]) => {
    let positionHorizontale = 0
    let profondeur = 0

    mouvments.forEach((mouvment) => {
        const [moveType, moveDistanceString] = mouvment.split(' ')
        const moveDistance = parseInt(moveDistanceString)
        if (moveType === 'forward') {
            positionHorizontale += moveDistance
        } else if (moveType === 'down') {
            profondeur += moveDistance
        } else if (moveType === 'up') {
            profondeur -= moveDistance
        }
    })

    return positionHorizontale * profondeur

}

export const whereIsTheShip2 = (mouvments: string[]) => {
    let positionHorizontale2 = 0
    let profondeur2 = 0
    let aim = 0

    mouvments.forEach((mouvment) => {
        let [moveType, moveDistanceString] = mouvment.split(' ')
        const moveDistance = parseInt(moveDistanceString)
        if (moveType === 'forward') {
            positionHorizontale2 += moveDistance
            profondeur2 += aim * moveDistance
        } else if (moveType === 'down') {
            aim += moveDistance
        } else if (moveType === 'up') {
            aim -= moveDistance
        }
    })

    return profondeur2 * positionHorizontale2

}