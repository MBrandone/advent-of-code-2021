# Advent of Code 2021

## KPIT

### Comment ça marche reduce
```
[0, 1, 2, 3, 4].reduce((accumulateur, valeurCourante, index, array) => {
  return accumulateur + valeurCourante;
}, valeurInitialDeLAccumulateur);
```

### Les retours des fonctions utils des tableau

push retourne => 

concat retourne => 

slice retourne le tableau coupé, le tableau sur lequel on utilise la méthode n'est pas modifié

## Fonction util
parseInt()
insérer un élément à un index particulier dans un tableau
```
You want the splice function on the native array object.

arr.splice(index, 0, item); will insert item into arr at the specified index (deleting 0 items first, that is, it's just an insert).
```

## Les références objets et array

## Pour aller plus loin

### Specific Refacto Checklist
  - [ ] Parser le format texte
  - [ ] comparer aux algos les plus performants

### Global Refacto Checklist
  - [ ] Lint du code
  - [ ] Le code s'éxécute bien avec ts-node => (sinon corriger les erreurs)
  - [ ] DRY => Don't repeat yourself
  - [ ] Fonctions pures => Toutes les variables sont en paramètres
  - [ ] Verifier règles de [clean code](https://github.com/labs42io/clean-code-typescript)
  - [ ] Plus de let (c'est difficile à suivre)
