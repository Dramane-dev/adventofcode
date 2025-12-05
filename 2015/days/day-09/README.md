# Day 9: All in a Single Night

[Link to puzzle description](https://adventofcode.com/2015/day/9)

## Puzzle Summary

Chaque année, le Père Noël parvient à livrer tous ses cadeaux en une seule nuit. Cette année, il doit visiter de **nouvelles destinations**, et ses elfes lui ont fourni les **distances entre chaque paire de villes**.

Santa peut commencer et terminer dans n'importe quelle ville, mais il doit **visiter chaque ville exactement une fois**. C'est le problème classique du **voyageur de commerce** (Traveling Salesman Problem).

### Format des données

Chaque ligne d'entrée définit une distance entre deux villes :
London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141

text

### Exemple (Part 1)

Avec les 3 villes ci-dessus, il existe 6 routes possibles :
- `Dublin -> London -> Belfast = 982`
- `London -> Dublin -> Belfast = 605` ⭐ (plus court)
- `London -> Belfast -> Dublin = 659`
- `Dublin -> Belfast -> London = 659`
- `Belfast -> Dublin -> London = 605` ⭐ (plus court)
- `Belfast -> London -> Dublin = 982`

La réponse est `605`.

---

## Your Task

- **Part 1:** Trouve la **distance totale du chemin le plus court** qui visite toutes les villes exactement une fois.
- **Part 2:** Santa veut maintenant se la péter un peu ! Trouve la **distance totale du chemin le plus long** qui visite toutes les villes exactement une fois.

---

```ruby
    cd 2015/days/day-09
    npm install
    npm start
    npm run test
```

_Source code and tests in `day-09/`._

_Enjoy coding!_
