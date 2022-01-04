export const howManyLanternFishAfterDays = (initialPopulation: number[], daysToCount: number): number => {
    const ageWhenCreateANewLanternFish = 0;
    const newAgeWhenCreateANewLanternFish = 6;
    const ageWhenJustBorn = 8;
    const maxAgeForInitialPopulation: number = Math.max(...initialPopulation, 8)

    let populationByAge: number[] = []
    for (let k=0; k<=maxAgeForInitialPopulation; k++) {
        populationByAge[k] = initialPopulation.filter(age => age === k).length
    }

    for (let i=0; i < daysToCount; i++) {
        populationByAge = populationByAge.map((number, age, populationByAge) => {
            if (age === 6) {
                return populationByAge[7] + populationByAge[0]
            } else if (age === 8) {
                return populationByAge[0]
            } else {
                return populationByAge[age + 1]
            }
        })
    }

    return populationByAge.reduce((acc, current) => {
        return acc + current
    }, 0)
}
