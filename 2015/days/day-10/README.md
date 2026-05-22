# Day 10: Elves Look, Elves Say

[Link to puzzle description](https://adventofcode.com/2015/day/10)

## Puzzle Summary

Aujourd'hui, les Elfes jouent à un jeu appelé **look-and-say** (regarde et dis). Ils créent des séquences en lisant à voix haute la séquence précédente, et cette lecture devient la prochaine séquence [web:5].

### Le principe Look-and-Say

Pour chaque étape, tu prends la valeur précédente et tu remplaces chaque **suite de chiffres identiques** par :
1. Le **nombre de chiffres** dans cette suite
2. Suivi du **chiffre lui-même** [web:5]

### Exemples de transformation

- `1` devient `11` (1 copie du chiffre 1)
- `11` devient `21` (2 copies du chiffre 1)
- `21` devient `1211` (un 2, suivi d'un 1)
- `1211` devient `111221` (un 1, un 2, et deux 1)
- `111221` devient `312211` (trois 1, deux 2, et un 1) [web:5]

### Cas concret

Si tu pars de `211` :
- Tu lis "one two, two ones" (un 2, deux 1)
- Cela devient `1221` [web:5]

---

## Your Task

- **Part 1:** En partant de ton input puzzle, applique ce processus **40 fois**. **Quelle est la longueur de la séquence résultante ?** [web:5]

- **Part 2:** Même défi, mais applique maintenant le processus **50 fois**. **Quelle est la longueur de la nouvelle séquence ?** [web:5]

> 💡 **Fun fact:** Cette séquence a été étudiée par John Conway (créateur du célèbre "Game of Life") ! [web:5]

---

```ruby
    cd 2015/days/day-10
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-10/`._

_Enjoy coding!_
