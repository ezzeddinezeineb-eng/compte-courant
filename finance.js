const date = new Date()
document.getElementById("date").value = date.getFullYear()


document.getElementById('table').style.display = ''
document.getElementById('par').style.display = 'none'
const t = document.getElementById('tab')
const x = document.createAttribute('class')
x.value = "head act"
t.setAttributeNode(x)
const p = document.getElementById('para')
const y = document.createAttribute('class')
y.value = "head"
p.setAttributeNode(y)

function activtable() {
  document.getElementById('table').style.display = ''
  document.getElementById('par').style.display = 'none'
  const t = document.getElementById('tab')
  const x = document.createAttribute('class')
  x.value = "head act"
  t.setAttributeNode(x)
  const p = document.getElementById('para')
  const y = document.createAttribute('class')
  y.value = "head"
  p.setAttributeNode(y)

}
function activpar() {
  document.getElementById('table').style.display = 'none'
  document.getElementById('par').style.display = ''
  const t = document.getElementById('tab')
  const x = document.createAttribute('class')
  x.value = "head"
  t.setAttributeNode(x)
  const p = document.getElementById('para')
  const y = document.createAttribute('class')
  y.value = "head act"
  p.setAttributeNode(y)
}


let nbjour = 1
let tcd = 0.0003
let tcpfd = 0.001
let noweekend = false
let annee = 2026
let datsdf = "30/06"
let ljf = ["01/01", "17/12", "20/03", "09/04", "01/05", "25/07", "13/08"]
let tmois = [0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08]
let capmois = ["31/03", "30/06", "30/09", "31/12"]
let listprincipal = []

// functions
function dateexist(auj, dat, op = ">=") {
  let jja = Number(auj.substring(0, 2))
  let mma = Number(auj.substring(3, 5))
  let aaa = Number(auj.substring(6, 10))
  let jjd = Number(dat.substring(0, 2))
  let mmd = Number(dat.substring(3, 5))
  let aad = Number(dat.substring(6, 10))
  if (aaa > aad) {
    return (true)
  } else if (aaa < aad) {
    return (false)
  }
  if (mma > mmd) {
    return (true)
  } else if (mma < mmd) {
    return (false)
  }
  if (op === ">=") {
    if (jja >= jjd) {
      return (true)
    } else {
      return (false)
    }
  } else if (op === ">") {
    if (jja > jjd) {
      return (true)
    } else {
      return (false)
    }
  } else {
    return ("operator must be > or >=")
  }
}// compar date if auj > or >= dat return true else false
function cherche(x, y) {
  let i = 0;
  let condition = false
  while (!(condition) && i !== y.length) {
    if (x === y[i]) {
      condition = true
    } else {
      i++
    }
  }
  return (condition)
}// chercher un seul élement x  dans une liste ou bien dans un chaine y
function Ghodwa(params) {
  let jj = Number(params.substring(0, 2))
  let mm = Number(params.substring(3, 5))
  let aa = Number(params.substring(6, 10))
  if (mm === 2 && jj === (aa % 4 === 0 ? 29 : 28)) {
    return ('01/03/' + params.substring(6, 10))
  } else if (cherche(mm, [1, 3, 5, 7, 8, 10, 12]) && jj === 31) {
    if (mm === 12) {
      return ('01/01/' + kamell(aa + 1, 4))
    } else {
      return ('01' + '/' + kamell(mm + 1, 2) + '/' + kamell(aa, 4))
    }
  } else if (cherche(mm, [4, 6, 9, 11]) && jj === 30) {
    return ('01' + '/' + kamell(mm + 1, 2) + '/' + kamell(aa, 4))
  } else {
    return (kamell(jj + 1, 2) + '/' + kamell(mm, 2) + '/' + kamell(aa, 4))
  }
} // tala3li ghodwa chnou d'une date bien ferifier avec les deux functions dateverif et datevalable
function Emes(params) {
  let jj = Number(params.substring(0, 2))
  let mm = Number(params.substring(3, 5))
  let aa = Number(params.substring(6, 10))
  if (jj === 1 && cherche(mm, [5, 7, 10, 12])) {
    return ('30/' + kamell(mm - 1, 2) + '/' + params.substring(6, 10))
  } else if (jj === 1 && mm === 3 && aa % 4 === 0) {
    return ('29/02/' + params.substring(6, 10))
  } else if (jj === 1 && mm === 3) {
    return ('28/02/' + params.substring(6, 10))
  } else if (jj === 1 && mm === 1) {
    return ('31/12/' + kamell(aa - 1, 4))
  } else if (jj === 1) {
    return ('31/' + kamell(mm - 1, 2) + '/' + params.substring(6, 10))
  } else {
    return (kamell(jj - 1, 2) + '/' + params.substring(3, 5) + '/' + params.substring(6, 10))
  }
}
function internationalToNormalDate(s) {
  return (s.substring(8, 10) + '/' + s.substring(5, 7) + '/' + s.substring(0, 4))
} // 2024-07-11 => 11/07/2024
function normalDateToInternational(s) {
  return (s.substring(6, 10) + '-' + s.substring(3, 5) + '-' + s.substring(0, 2))
} // 11/07/2024 => 2024-07-11
function my_round(x, y = 3) {
  return Math.round(x * (10 ** y)) / (10 ** y);
}
function datevaleur(date, testcd, testw) {
  let d = date + "/" + annee
  testcd ? d = Ghodwa(d) : d = Emes(d)
  date = d.substring(0, 5)
  if ((testcd) && (testw)) {
    while ((cherche(date, ljf)) || (new Date(normalDateToInternational(d)).getDay() == 0) || (new Date(normalDateToInternational(d)).getDay() == 6)) {
      d = Ghodwa(d)
      date = d.substring(0, 5)
    }
  }
  if ((testcd) && (testw == false)) {
    while (cherche(date, ljf)) {
      d = Ghodwa(d)
      date = d.substring(0, 5)
    }
  }
  if ((testcd == false) && (testw)) {
    while ((cherche(date, ljf)) || (new Date(normalDateToInternational(d)).getDay() == 0) || (new Date(normalDateToInternational(d)).getDay() == 6)) {
      d = Emes(d)
      date = d.substring(0, 5)
    }
  }
  if ((testcd == false) && (testw == false)) {
    while (cherche(date, ljf)) {
      d = Emes(d)
      date = d.substring(0, 5)
    }
  }
  return (date)
}
function kamell(params, n = 2) {
  let ch = String(params)
  let x = ch.length
  for (let i = 0; i < n - x; i++) {
    ch = '0' + ch
  }
  return (ch)
}// tkameli lasfar mt3 jour wlmoi par exemple
function nbrjour(debut, fin) {
  if (normalDateToInternational(debut) === normalDateToInternational(fin)) {
    return (0)
  } else {
    return (nbrjour(Ghodwa(debut), fin) + 1)
  }
}
function tri(tab) {
  const n = tab.length;
  for (let i = 0; i < n - 1; i++) {
    let iMin = i;
    for (let j = i + 1; j < n; j++) {
      if (dateexist(datevaleur(tab[iMin][1], tab[iMin][3], noweekend) + "/" + annee, datevaleur(tab[j][1], tab[j][3], noweekend) + "/" + annee, ">")) {
        iMin = j;
      }
    }
    if (iMin !== i) {
      [tab[i], tab[iMin]] = [tab[iMin], tab[i]];
    }
  }
  return tab;
}
function calcultab(params) {
  let l = []
  let sd = 0
  for (let i = 0; i < params.length - 1; i++) {
    let lelement = [params[i][0], params[i][1], datevaleur(params[i][1], params[i][3], noweekend)]
    let testdebutperiode = false
    if (params[i][3]) {
      lelement.push("")
      lelement.push(String(my_round(params[i][2], 3)))
      sd += my_round(params[i][2], 3)
    } else {
      lelement.push(String(my_round(params[i][2], 3)))
      lelement.push("")
      sd -= my_round(params[i][2], 3)
    }

    if (sd >= 0) {
      lelement.push("")
      lelement.push(String(sd))
    } else {
      lelement.push(String(-sd))
      lelement.push("")
    }

    if (sd < 0) {
      if (Number(lelement[2].substring(3, 5)) == Number(datevaleur(params[i + 1][1], params[i + 1][3], noweekend).substring(3, 5))) {
        lelement.push(String(nbrjour(lelement[2] + "/" + annee, datevaleur(params[i + 1][1], params[i + 1][3], noweekend) + "/" + annee)) + " + " + nbjour)
        lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
        lelement.push(String(-sd * (nbrjour(lelement[2] + "/" + annee, datevaleur(params[i + 1][1], params[i + 1][3], noweekend) + "/" + annee) + nbjour)))
        lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
        lelement.push("")
        if (!params[i][3]) {
          lelement.push(String(my_round(params[i][2] * tcd, 3)))
          lelement.push(String(my_round(params[i][2] * tcd, 3)))
        } else {
          lelement.push("")
          lelement.push("")
        }
        lelement.push("")
        lelement.push("normalDebit")
      } else {
        testdebutperiode = true
        lelement.push(String(nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee)) + " + " + nbjour)
        lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
        lelement.push(String(-sd * (nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee) + nbjour)))
        lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
        lelement.push("")
        if (!params[i][3]) {
          lelement.push(String(my_round(params[i][2] * tcd, 3)))
          lelement.push(String(my_round(params[i][2] * tcd, 3)))
        } else {
          lelement.push("")
          lelement.push("")
        }
        lelement.push("")
        lelement.push("normalDebit")
      }
    } else {
      lelement.push("")
      lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
      lelement.push("")
      lelement.push("")
      lelement.push("")
      if (!params[i][3]) {
        lelement.push(String(my_round(params[i][2] * tcd, 3)))
        lelement.push(String(my_round(params[i][2] * tcd, 3)))
      } else {
        lelement.push("")
        lelement.push("")
      }
      lelement.push("")
      lelement.push("normalCredit")
    }

    l.push(lelement)

    // cas chhar fih solde debiteur wyoufa solde crediteur wcapitalisation
    if (sd >= 0 && Number(lelement[2].substring(3, 5)) != Number(datevaleur(params[i + 1][1], params[i + 1][3], noweekend).substring(3, 5))) {
      let ch = l[l.length - 1][2].substring(3, 5)
      let max = 0
      let imax = 1
      let index = 1
      while (ch == l[l.length - index][2].substring(3, 5)) {
        if (l[l.length - index][5] !== "" && Number(l[l.length - index][5]) > max) {
          [max, imax] = [Number(l[l.length - index][5]), index]
        }
        if (l.length > index) {
          index++
        } else {
          break
        }
      }
      if (max != 0) {
        l[l.length - imax][11] = String(my_round(l[l.length - imax][5] * tcpfd, 3))
        l[l.length - imax][13] = String(my_round(l[l.length - imax][5] * tcpfd + Number(l[l.length - imax][12]), 3))
      }

      // capitalsation
      let jcap = Emes("01/" + kamell(String(Number(l[l.length - 1][2].substring(3, 5)) + 1)) + "/" + annee)
      while (Number(jcap.substring(3, 5)) != Number(datevaleur(params[i + 1][1], params[i + 1][3], noweekend).substring(3, 5))) {
        if (cherche(jcap.substring(0, 5), capmois)) {
          let sid = 0
          let stot = 0
          let index = 1
          while (l[l.length - index][0] != "Capitalisation") {
            sid += Number(l[l.length - index][10])
            stot += Number(l[l.length - index][13])
            if (l.length > index) {
              index++
            } else {
              break
            }
          }
          sd -= (sid + stot)
          lelement = ["Capitalisation", jcap.substring(0, 5), jcap.substring(0, 5), String(my_round(sid + stot)), "", sd < 0 ? String(my_round(-sd)) : "", sd >= 0 ? String(my_round(sd)) : "", "", "", "", "", "", "", "", String(my_round(sid)), "Capitalisation"]
          l.push(lelement)
        }
        if (sd >= 0) {
          jcap = Emes("01/" + kamell(String(Number(jcap.substring(3, 5)) + 2)) + "/" + annee)
        } else {
          lelement = ["Debut periode", Ghodwa(jcap).substring(0, 5), Ghodwa(jcap).substring(0, 5), "", "", String(my_round(-sd)), ""]
          if (Number(lelement[2].substring(3, 5)) == Number(datevaleur(params[i + 1][1], params[i + 1][3], noweekend).substring(3, 5))) {
            lelement.push(String(nbrjour(lelement[2] + "/" + annee, datevaleur(params[i + 1][1], params[i + 1][3], noweekend) + "/" + annee)))
            lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
            lelement.push(String(my_round(-sd * nbrjour(lelement[2] + "/" + annee, datevaleur(params[i + 1][1], params[i + 1][3], noweekend) + "/" + annee))))
            lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
            lelement.push("")
            lelement.push("")
            lelement.push("")
            lelement.push("")
            lelement.push("debutPeriode")
          } else {
            testdebutperiode = true
            lelement.push(String(nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee)))
            lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
            lelement.push(String(my_round(-sd * nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee))))
            lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
            lelement.push("")
            lelement.push("")
            lelement.push("")
            lelement.push("")
            lelement.push("debutPeriode")
          }

          l.push(lelement)
          break
        }
      }

    }

    while (testdebutperiode) {
      testdebutperiode = false
      // recherche de plus fort decouvert
      let ch = l[l.length - 1][2].substring(3, 5)
      let max = Number(l[l.length - 1][5])
      let imax = 1
      let index = 2
      while (ch == l[l.length - index][2].substring(3, 5)) {
        if (l[l.length - index][5] !== "" && Number(l[l.length - index][5]) > max) {
          [max, imax] = [Number(l[l.length - index][5]), index]
        }
        if (l.length > index) {
          index++
        } else {
          break
        }
      }
      l[l.length - imax][11] = String(my_round(l[l.length - imax][5] * tcpfd, 3))
      l[l.length - imax][13] = String(my_round(l[l.length - imax][5] * tcpfd + Number(l[l.length - imax][12]), 3))

      // capitalisation
      let jcap = Emes("01/" + kamell(String(Number(l[l.length - 1][2].substring(3, 5)) + 1)) + "/" + annee)
      if (cherche(jcap.substring(0, 5), capmois)) {
        let sid = 0
        let stot = 0
        let index = 1
        while (l[l.length - index][0] != "Capitalisation") {
          sid += Number(l[l.length - index][10])
          stot += Number(l[l.length - index][13])
          if (l.length > index) {
            index++
          } else {
            break
          }
        }
        sd -= (sid + stot)
        lelement = ["Capitalisation", jcap.substring(0, 5), jcap.substring(0, 5), String(my_round(sid + stot)), "", String(my_round(-sd)), "", "", "", "", "", "", "", "", String(my_round(sid)), "Capitalisation"]
        l.push(lelement)
      }

      //l'ajout du periode
      lelement = ["Debut periode", "01/" + kamell(String(Number(l[l.length - 1][2].substring(3, 5)) + 1)), "01/" + kamell(String(Number(l[l.length - 1][2].substring(3, 5)) + 1)), "", "", String(my_round(-sd)), ""]
      if (Number(lelement[2].substring(3, 5)) == Number(datevaleur(params[i + 1][1], params[i + 1][3], noweekend).substring(3, 5))) {
        lelement.push(String(nbrjour(lelement[2] + "/" + annee, datevaleur(params[i + 1][1], params[i + 1][3], noweekend) + "/" + annee)))
        lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
        lelement.push(String(my_round(-sd * nbrjour(lelement[2] + "/" + annee, datevaleur(params[i + 1][1], params[i + 1][3], noweekend) + "/" + annee))))
        lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
        lelement.push("")
        lelement.push("")
        lelement.push("")
        lelement.push("")
        lelement.push("debutPeriode")
      } else {
        testdebutperiode = true
        lelement.push(String(nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee)))
        lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
        lelement.push(String(my_round(-sd * nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee))))
        lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
        lelement.push("")
        lelement.push("")
        lelement.push("")
        lelement.push("")
        lelement.push("debutPeriode")
      }

      l.push(lelement)

    }

  }


  let lelement = [params[params.length - 1][0], params[params.length - 1][1], datevaleur(params[params.length - 1][1], params[params.length - 1][3], noweekend)]
  let testdebutperiode = false
  if (params[params.length - 1][3]) {
    lelement.push("")
    lelement.push(String(my_round(params[params.length - 1][2], 3)))
    sd += my_round(params[params.length - 1][2], 3)
  } else {
    lelement.push(String(my_round(params[params.length - 1][2], 3)))
    lelement.push("")
    sd -= my_round(params[params.length - 1][2], 3)
  }

  if (sd >= 0) {
    lelement.push("")
    lelement.push(String(sd))
  } else {
    lelement.push(String(-sd))
    lelement.push("")
  }

  if (sd < 0) {
    if (Number(lelement[2].substring(3, 5)) == Number(datsdf.substring(3, 5))) {
      lelement.push(String(nbrjour(lelement[2] + "/" + annee, datsdf + "/" + annee)) + " + " + nbjour)
      lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
      lelement.push(String(-sd * (nbrjour(lelement[2] + "/" + annee, datsdf + "/" + annee) + nbjour)))
      lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
      lelement.push("")
      if (!params[params.length - 1][3]) {
        lelement.push(String(my_round(params[params.length - 1][2] * tcd, 3)))
        lelement.push(String(my_round(params[params.length - 1][2] * tcd, 3)))
      } else {
        lelement.push("")
        lelement.push("")
      }
      lelement.push("")
      lelement.push("normalDebit")
    } else {
      testdebutperiode = true
      lelement.push(String(nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee)) + " + " + nbjour)
      lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
      lelement.push(String(-sd * (nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee) + nbjour)))
      lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
      lelement.push("")
      if (!params[params.length - 1][3]) {
        lelement.push(String(my_round(params[params.length - 1][2] * tcd, 3)))
        lelement.push(String(my_round(params[params.length - 1][2] * tcd, 3)))
      } else {
        lelement.push("")
        lelement.push("")
      }
      lelement.push("")
      lelement.push("normalDebit")
    }
  } else {
    lelement.push("")
    lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
    lelement.push("")
    lelement.push("")
    lelement.push("")
    if (!params[params.length - 1][3]) {
      lelement.push(String(my_round(params[params.length - 1][2] * tcd, 3)))
      lelement.push(String(my_round(params[params.length - 1][2] * tcd, 3)))
    } else {
      lelement.push("")
      lelement.push("")
    }
    lelement.push("")
    lelement.push("normalCredit")
  }


  l.push(lelement)

  // cas chhar fih solde debiteur wyoufa solde crediteur wcapitalisation
  if (sd >= 0 && Number(lelement[2].substring(3, 5)) != Number(datsdf.substring(3, 5))) {
    let ch = l[l.length - 1][2].substring(3, 5)
    let max = 0
    let imax = 1
    let index = 1
    while (ch == l[l.length - index][2].substring(3, 5)) {
      if (l[l.length - index][5] !== "" && Number(l[l.length - index][5]) > max) {
        [max, imax] = [Number(l[l.length - index][5]), index]
      }
      if (l.length > index) {
        index++
      } else {
        break
      }
    }
    if (max != 0) {
      l[l.length - imax][11] = String(my_round(l[l.length - imax][5] * tcpfd, 3))
      l[l.length - imax][13] = String(my_round(l[l.length - imax][5] * tcpfd + Number(l[l.length - imax][12]), 3))
    }

    // capitalsation
    let jcap = Emes("01/" + kamell(String(Number(l[l.length - 1][2].substring(3, 5)) + 1)) + "/" + annee)
    while (Number(jcap.substring(3, 5)) != Number(datsdf.substring(3, 5))) {
      if (cherche(jcap.substring(0, 5), capmois)) {
        let sid = 0
        let stot = 0
        let index = 1
        while (l[l.length - index][0] != "Capitalisation") {
          sid += Number(l[l.length - index][10])
          stot += Number(l[l.length - index][13])
          if (l.length > index) {
            index++
          } else {
            break
          }
        }
        sd -= (sid + stot)
        lelement = ["Capitalisation", jcap.substring(0, 5), jcap.substring(0, 5), String(my_round(sid + stot)), "", sd < 0 ? String(my_round(-sd)) : "", sd >= 0 ? String(my_round(sd)) : "", "", "", "", "", "", "", "", String(my_round(sid)), "Capitalisation"]
        l.push(lelement)
      }
      if (sd >= 0) {
        jcap = Emes("01/" + kamell(String(Number(jcap.substring(3, 5)) + 2)) + "/" + annee)
      } else {
        lelement = ["Debut periode", Ghodwa(jcap).substring(0, 5), Ghodwa(jcap).substring(0, 5), "", "", String(my_round(-sd)), ""]
        if (Number(lelement[2].substring(3, 5)) == Number(datsdf.substring(3, 5))) {
          lelement.push(String(nbrjour(lelement[2] + "/" + annee, datsdf + "/" + annee)))
          lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
          lelement.push(String(my_round(-sd * nbrjour(lelement[2] + "/" + annee, datsdf + "/" + annee))))
          lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
          lelement.push("")
          lelement.push("")
          lelement.push("")
          lelement.push("")
          lelement.push("debutPeriode")
        } else {
          testdebutperiode = true
          lelement.push(String(nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee)))
          lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
          lelement.push(String(my_round(-sd * nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee))))
          lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
          lelement.push("")
          lelement.push("")
          lelement.push("")
          lelement.push("")
          lelement.push("debutPeriode")
        }

        l.push(lelement)
        break
      }
    }

  }


  while (testdebutperiode) {
    testdebutperiode = false
    // recherche de plus fort decouvert
    let ch = l[l.length - 1][2].substring(3, 5)
    let max = Number(l[l.length - 1][5])
    let imax = 1
    let index = 2
    while (ch == l[l.length - index][2].substring(3, 5)) {
      if (l[l.length - index][5] !== "" && Number(l[l.length - index][5]) > max) {
        [max, imax] = [Number(l[l.length - index][5]), index]
      }
      if (l.length > index) {
        index++
      } else {
        break
      }
    }
    l[l.length - imax][11] = String(my_round(l[l.length - imax][5] * tcpfd, 3))
    l[l.length - imax][13] = String(my_round(l[l.length - imax][5] * tcpfd + Number(l[l.length - imax][12]), 3))

    // capitalisation
    let jcap = Emes("01/" + kamell(String(Number(l[l.length - 1][2].substring(3, 5)) + 1)) + "/" + annee)
    if (cherche(jcap.substring(0, 5), capmois)) {
      let sid = 0
      let stot = 0
      let index = 1
      while (l[l.length - index][0] != "Capitalisation") {
        sid += Number(l[l.length - index][10])
        stot += Number(l[l.length - index][13])
        if (l.length > index) {
          index++
        } else {
          break
        }
      }
      sd -= (sid + stot)
      lelement = ["Capitalisation", jcap.substring(0, 5), jcap.substring(0, 5), String(my_round(sid + stot)), "", String(my_round(-sd)), "", "", "", "", "", "", "", "", String(my_round(sid)), "Capitalisation"]
      l.push(lelement)
    }

    //l'ajout du periode
    lelement = ["Debut periode", "01/" + kamell(String(Number(l[l.length - 1][2].substring(3, 5)) + 1)), "01/" + kamell(String(Number(l[l.length - 1][2].substring(3, 5)) + 1)), "", "", String(my_round(-sd)), ""]
    if (Number(lelement[2].substring(3, 5)) == Number(datsdf.substring(3, 5))) {
      lelement.push(String(nbrjour(lelement[2] + "/" + annee, datsdf + "/" + annee)))
      lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
      lelement.push(String(my_round(-sd * nbrjour(lelement[2] + "/" + annee, datsdf + "/" + annee))))
      lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
      lelement.push("")
      lelement.push("")
      lelement.push("")
      lelement.push("")
      lelement.push("debutPeriode")
    } else {
      testdebutperiode = true
      lelement.push(String(nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee)))
      lelement.push(String(tmois[Number(lelement[2].substring(3, 5)) - 1]))
      lelement.push(String(my_round(-sd * nbrjour(lelement[2] + "/" + annee, "01/" + kamell(Number(lelement[2].substring(3, 5)) + 1) + "/" + annee))))
      lelement.push(String(my_round(Number(lelement[9]) * tmois[Number(lelement[2].substring(3, 5)) - 1] / 360, 3)))
      lelement.push("")
      lelement.push("")
      lelement.push("")
      lelement.push("")
      lelement.push("debutPeriode")
    }

    l.push(lelement)

  }


  // capitalisation final
  let lf = []
  if (l[l.length - 1][15] == "Capitalisation") {
    lf = ["Capitalisation", datsdf, datsdf, "0", "", "", String(my_round(sd)), "", "", "", "", "", "", "", "0", "Capitalisation"]
  } else if (l[l.length - 1][15] == "debutPeriode") {
    l[l.length - 1][11] = String(my_round(l[l.length - 1][5] * tcpfd, 3))
    l[l.length - 1][13] = String(my_round(l[l.length - 1][5] * tcpfd + Number(l[l.length - 1][12]), 3))
    let sid = 0
    let stot = 0
    let z = 1
    while (l[l.length - z][0] != "Capitalisation") {
      sid += Number(l[l.length - z][10])
      stot += Number(l[l.length - z][13])
      if (l.length > z) {
        z++
      } else {
        break
      }
    }
    sd -= (sid + stot)
    lf = ["Capitalisation", datsdf, datsdf, String(my_round(sid + stot)), "", sd < 0 ? String(my_round(-sd)) : "", sd >= 0 ? String(my_round(sd)) : "", "", "", "", "", "", "", "", String(my_round(sid)), "Capitalisation"]
  } else {
    let ch = l[l.length - 1][2].substring(3, 5)
    let max = 0
    let imax = 1
    let index = 1
    while (ch == l[l.length - index][2].substring(3, 5)) {
      if (l[l.length - index][5] !== "" && Number(l[l.length - index][5]) > max) {
        [max, imax] = [Number(l[l.length - index][5]), index]
      }
      if (l.length > index) {
        index++
      } else {
        break
      }
    }
    if (max != 0) {
      l[l.length - imax][11] = String(my_round(l[l.length - imax][5] * tcpfd, 3))
      l[l.length - imax][13] = String(my_round(l[l.length - imax][5] * tcpfd + Number(l[l.length - imax][12]), 3))
    }

    let sid = 0
    let stot = 0
    let z = 1
    while (l[l.length - z][0] != "Capitalisation") {
      sid += Number(l[l.length - z][10])
      stot += Number(l[l.length - z][13])
      if (l.length > z) {
        z++
      } else {
        break
      }
    }
    sd -= (sid + stot)
    lf = ["Capitalisation", datsdf, datsdf, String(my_round(sid + stot)), "", sd < 0 ? String(my_round(-sd)) : "", sd >= 0 ? String(my_round(sd)) : "", "", "", "", "", "", "", "", String(my_round(sid)), "Capitalisation"]
  }
  l.push(lf)
  l.push(["Solde final", datsdf, datsdf, "", "", sd < 0 ? String(my_round(-sd)) : "", sd >= 0 ? String(my_round(sd)) : "", "", "", "", "", "", "", "", "", "Soldefinal"])


  return l
}
function find(str, car, number) {
  let k = -1
  let n = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === car) {
      k = i
      n++
      if (n === number) {
        return (k)
      }
    }
  }
  return (k)
}// find un seul caracter
function isdigit(params, sepetial = ".") {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  sepetial !== "" ? numbers.push(sepetial) : undefined
  if (find(params, sepetial, 1) != find(params, sepetial, 2)) {
    return false
  }
  let test = true
  for (let i = 0; i < params.length; i++) {
    if (!cherche(params[i], numbers)) {
      test = false
      break
    }
  }
  if (params === "") {
    test = false
  }
  return (test)
}
//function



function appliquer() {
  if (!isdigit(document.getElementById("jour").value) || !isdigit(document.getElementById("comd").value) || !isdigit(document.getElementById("comcpfd").value)) {
    alert("error")
    return
  }
  for (let i = 1; i < 13; i++) {
    if(!isdigit(document.getElementById("tmois" + String(i)).value)){
      alert("error")
      return
    }
  }
  nbjour = document.getElementById("jour").value;
  tcd = document.getElementById("comd").value;
  tcpfd = document.getElementById("comcpfd").value;
  noweekend = document.getElementById("weekend").checked;
  annee = document.getElementById("date").value;
  ljf = document.getElementById("date2").value.split(" ")

  if (document.getElementById("jf1").checked) {
    ljf.push("01/01")
  }
  if (document.getElementById("jf2").checked) {
    ljf.push("17/12")

  }
  if (document.getElementById("jf3").checked) {
    ljf.push("20/03")

  }
  if (document.getElementById("jf4").checked) {
    ljf.push("09/04")
  }
  if (document.getElementById("jf5").checked) {
    ljf.push("01/05")
  }
  if (document.getElementById("jf6").checked) {
    ljf.push("25/07")
  }
  if (document.getElementById("jf7").checked) {
    ljf.push("13/08")
  }
  for (let i = 1; i < 13; i++) {
    tmois[i] = Number(document.getElementById("tmois" + String(i)).value);
  }
  if (listprincipal.length==0) {
    alert("Modification apliquée avec succès")
    return 
  }
  document.getElementById('tab0').replaceChildren()
  const lt = document.createElement('tr')
  const mt = document.createAttribute("class")
  mt.value = "row t"
  lt.setAttributeNode(mt)
  const ct0 = document.createElement('th')
  ct0.innerHTML = "Source"
  const ct1 = document.createElement('th')
  ct1.innerHTML = "Date_operation"
  const ct2 = document.createElement('th')
  ct2.innerHTML = "Date_valeur"
  const ct3 = document.createElement('th')
  ct3.innerHTML = "Débit"
  const ct4 = document.createElement('th')
  ct4.innerHTML = "Credit"
  const ct5 = document.createElement('th')
  ct5.innerHTML = "Solde_debiteur"
  const ct6 = document.createElement('th')
  ct6.innerHTML = "Solde_crediteur"
  const ct7 = document.createElement('th')
  ct7.innerHTML = "NbrJD"
  const ct8 = document.createElement('th')
  ct8.innerHTML = "Taux_decouvert"
  const ct9 = document.createElement('th')
  ct9.innerHTML = "ND"
  const ct10 = document.createElement('th')
  ct10.innerHTML = "ID"
  const ct11 = document.createElement('th')
  ct11.innerHTML = "CPFD"
  const ct12 = document.createElement('th')
  ct12.innerHTML = "CD"
  const ct13 = document.createElement('th')
  ct13.innerHTML = "TotalCom"
  const ct14 = document.createElement('th')
  ct14.innerHTML = "Cap_ID"
  lt.appendChild(ct0)
  lt.appendChild(ct1)
  lt.appendChild(ct2)
  lt.appendChild(ct3)
  lt.appendChild(ct4)
  lt.appendChild(ct5)
  lt.appendChild(ct6)
  lt.appendChild(ct7)
  lt.appendChild(ct8)
  lt.appendChild(ct9)
  lt.appendChild(ct10)
  lt.appendChild(ct11)
  lt.appendChild(ct12)
  lt.appendChild(ct13)
  lt.appendChild(ct14)
  document.getElementById('tab0').appendChild(lt)

  let newlist = calcultab(tri(listprincipal))
  newlist.forEach(element => {
    const lt = document.createElement('tr')
    if (element[0] == "solde initial") {
      const mt = document.createAttribute("class")
      mt.value = "row si"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = Number(element[8]) * 100 + "%"
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    } else if (element[15] == "normalCredit") {
      const mt = document.createAttribute("class")
      mt.value = "row c"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = Number(element[8]) * 100 + "%"
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    else if (element[15] == "normalDebit") {
      const mt = document.createAttribute("class")
      mt.value = "row d"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = Number(element[8]) * 100 + "%"
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    else if (element[15] == "Capitalisation") {
      const mt = document.createAttribute("class")
      mt.value = "row cap"
      lt.setAttributeNode(mt)
      const a = document.createAttribute("id")
      a.value = "capc"
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      ct0.setAttributeNode(a)
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = element[8]
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    else if (element[15] == "debutPeriode") {
      const mt = document.createAttribute("class")
      mt.value = "row periode"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = Number(element[8]) * 100 + "%"
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    else {
      const mt = document.createAttribute("class")
      mt.value = "row sf"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const a0 = document.createAttribute("id")
      a0.value = "f2"
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      if (ct5.innerHTML != "") {
        ct5.setAttributeNode(a0)
      } else {
        ct6.setAttributeNode(a0)
      }
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = element[8]
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    document.getElementById('tab0').appendChild(lt)
  })
  alert("Modification appliquée avec succès!")
}


function ajouter0() {
  let soldeinit = document.getElementById("soldei").value
  let datsldi = document.getElementById("datesi").value
  if (document.getElementById("datesf1").checked) {
    datsdf = "31/03"
  } else if (document.getElementById("datesf2").checked) {
    datsdf = "30/06"
  } else if (document.getElementById("datesf3").checked) {
    datsdf = "30/09"
  } else {
    datsdf = "31/12"
  }
  if (dateexist(internationalToNormalDate(datsldi).substring(0, 5) + "/" + annee, datsdf + "/" + annee) || (soldeinit == "") || (datsldi == "")) {
    alert("error!")
    return
  }
  listprincipal.push(["solde initial", internationalToNormalDate(datsldi).substring(0, 5), Number(soldeinit), true])
  document.getElementById('soldeinitial').style.display = 'none'
  document.getElementById('soldefinal').style.display = 'none'
  document.getElementById('transaction').style.display = ''
  const lt = document.createElement('tr')
  const mt = document.createAttribute("class")
  mt.value = "row t"
  lt.setAttributeNode(mt)
  const ct0 = document.createElement('th')
  ct0.innerHTML = "Source"
  const ct1 = document.createElement('th')
  ct1.innerHTML = "Date_operation"
  const ct2 = document.createElement('th')
  ct2.innerHTML = "Date_valeur"
  const ct3 = document.createElement('th')
  ct3.innerHTML = "Débit"
  const ct4 = document.createElement('th')
  ct4.innerHTML = "Credit"
  const ct5 = document.createElement('th')
  ct5.innerHTML = "Solde_debiteur"
  const ct6 = document.createElement('th')
  ct6.innerHTML = "Solde_crediteur"
  const ct7 = document.createElement('th')
  ct7.innerHTML = "NbrJD"
  const ct8 = document.createElement('th')
  ct8.innerHTML = "Taux_decouvert"
  const ct9 = document.createElement('th')
  ct9.innerHTML = "ND"
  const ct10 = document.createElement('th')
  ct10.innerHTML = "ID"
  const ct11 = document.createElement('th')
  ct11.innerHTML = "CPFD"
  const ct12 = document.createElement('th')
  ct12.innerHTML = "CD"
  const ct13 = document.createElement('th')
  ct13.innerHTML = "TotalCom"
  const ct14 = document.createElement('th')
  ct14.innerHTML = "Cap_ID"
  lt.appendChild(ct0)
  lt.appendChild(ct1)
  lt.appendChild(ct2)
  lt.appendChild(ct3)
  lt.appendChild(ct4)
  lt.appendChild(ct5)
  lt.appendChild(ct6)
  lt.appendChild(ct7)
  lt.appendChild(ct8)
  lt.appendChild(ct9)
  lt.appendChild(ct10)
  lt.appendChild(ct11)
  lt.appendChild(ct12)
  lt.appendChild(ct13)
  lt.appendChild(ct14)

  const l0 = document.createElement('tr')
  const m0 = document.createAttribute("class")
  m0.value = "row si"
  l0.setAttributeNode(m0)
  const c00 = document.createElement('th')
  c00.innerHTML = "solde initial"
  const c01 = document.createElement('th')
  c01.innerHTML = internationalToNormalDate(datsldi).substring(0, 5)
  const c02 = document.createElement('th')
  c02.innerHTML = datevaleur(internationalToNormalDate(datsldi).substring(0, 5), true, noweekend)
  const c03 = document.createElement('th')
  const c04 = document.createElement('th')
  c04.innerHTML = soldeinit
  const c05 = document.createElement('th')
  const c06 = document.createElement('th')
  c06.innerHTML = soldeinit
  const c07 = document.createElement('th')
  const c08 = document.createElement('th')
  c08.innerHTML = String(tmois[Number(internationalToNormalDate(datsldi).substring(3, 5)) - 1] * 100) + "%"
  const c09 = document.createElement('th')
  const c10 = document.createElement('th')
  const c11 = document.createElement('th')
  const c12 = document.createElement('th')
  const c13 = document.createElement('th')
  const c14 = document.createElement('th')
  l0.appendChild(c00)
  l0.appendChild(c01)
  l0.appendChild(c02)
  l0.appendChild(c03)
  l0.appendChild(c04)
  l0.appendChild(c05)
  l0.appendChild(c06)
  l0.appendChild(c07)
  l0.appendChild(c08)
  l0.appendChild(c09)
  l0.appendChild(c10)
  l0.appendChild(c11)
  l0.appendChild(c12)
  l0.appendChild(c13)
  l0.appendChild(c14)

  const l1 = document.createElement('tr')
  const m1 = document.createAttribute("class")
  m1.value = "row sf"
  l1.setAttributeNode(m1)
  const b00 = document.createElement('th')
  b00.innerHTML = "solde final"
  const b01 = document.createElement('th')
  b01.innerHTML = datsdf
  const b02 = document.createElement('th')
  b02.innerHTML = datsdf
  const b03 = document.createElement('th')
  const b04 = document.createElement('th')
  const a04 = document.createAttribute("id")
  const b05 = document.createElement('th')
  const b06 = document.createElement('th')
  a04.value = "f2"
  b06.setAttributeNode(a04)
  b06.innerHTML = soldeinit
  const b07 = document.createElement('th')
  const b08 = document.createElement('th')
  const b09 = document.createElement('th')
  const b10 = document.createElement('th')
  const b11 = document.createElement('th')
  const b12 = document.createElement('th')
  const b13 = document.createElement('th')
  const b14 = document.createElement('th')
  l1.appendChild(b00)
  l1.appendChild(b01)
  l1.appendChild(b02)
  l1.appendChild(b03)
  l1.appendChild(b04)
  l1.appendChild(b05)
  l1.appendChild(b06)
  l1.appendChild(b07)
  l1.appendChild(b08)
  l1.appendChild(b09)
  l1.appendChild(b10)
  l1.appendChild(b11)
  l1.appendChild(b12)
  l1.appendChild(b13)
  l1.appendChild(b14)

  document.getElementById("tab0").appendChild(lt)
  document.getElementById("tab0").appendChild(l0)
  document.getElementById("tab0").appendChild(l1)

}

function ajouter() {
  let source = document.getElementById("source").value
  let mont = document.getElementById("mont").value
  let dateop = document.getElementById("newdate").value
  let cred = document.getElementById("cred").checked
  if (dateexist(internationalToNormalDate(dateop).substring(0, 5) + "/" + annee, datsdf + "/" + annee) || dateexist(listprincipal[0][1] + "/" + annee, internationalToNormalDate(dateop).substring(0, 5) + "/" + annee) || (mont == "") || (dateop == "") || (source == "")) {
    alert("error!")
    return
  }
  listprincipal.push([source, internationalToNormalDate(dateop).substring(0, 5), Number(mont), cred])
  document.getElementById("source").value = ""
  document.getElementById("mont").value = ""
  document.getElementById("newdate").value = ""

  document.getElementById('tab0').replaceChildren()
  const lt = document.createElement('tr')
  const mt = document.createAttribute("class")
  mt.value = "row t"
  lt.setAttributeNode(mt)
  const ct0 = document.createElement('th')
  ct0.innerHTML = "Source"
  const ct1 = document.createElement('th')
  ct1.innerHTML = "Date_operation"
  const ct2 = document.createElement('th')
  ct2.innerHTML = "Date_valeur"
  const ct3 = document.createElement('th')
  ct3.innerHTML = "Débit"
  const ct4 = document.createElement('th')
  ct4.innerHTML = "Credit"
  const ct5 = document.createElement('th')
  ct5.innerHTML = "Solde_debiteur"
  const ct6 = document.createElement('th')
  ct6.innerHTML = "Solde_crediteur"
  const ct7 = document.createElement('th')
  ct7.innerHTML = "NbrJD"
  const ct8 = document.createElement('th')
  ct8.innerHTML = "Taux_decouvert"
  const ct9 = document.createElement('th')
  ct9.innerHTML = "ND"
  const ct10 = document.createElement('th')
  ct10.innerHTML = "ID"
  const ct11 = document.createElement('th')
  ct11.innerHTML = "CPFD"
  const ct12 = document.createElement('th')
  ct12.innerHTML = "CD"
  const ct13 = document.createElement('th')
  ct13.innerHTML = "TotalCom"
  const ct14 = document.createElement('th')
  ct14.innerHTML = "Cap_ID"
  lt.appendChild(ct0)
  lt.appendChild(ct1)
  lt.appendChild(ct2)
  lt.appendChild(ct3)
  lt.appendChild(ct4)
  lt.appendChild(ct5)
  lt.appendChild(ct6)
  lt.appendChild(ct7)
  lt.appendChild(ct8)
  lt.appendChild(ct9)
  lt.appendChild(ct10)
  lt.appendChild(ct11)
  lt.appendChild(ct12)
  lt.appendChild(ct13)
  lt.appendChild(ct14)
  document.getElementById('tab0').appendChild(lt)

  let newlist = calcultab(tri(listprincipal))
  newlist.forEach(element => {
    const lt = document.createElement('tr')
    if (element[0] == "solde initial") {
      const mt = document.createAttribute("class")
      mt.value = "row si"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = Number(element[8]) * 100 + "%"
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    } else if (element[15] == "normalCredit") {
      const mt = document.createAttribute("class")
      mt.value = "row c"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = Number(element[8]) * 100 + "%"
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    else if (element[15] == "normalDebit") {
      const mt = document.createAttribute("class")
      mt.value = "row d"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = Number(element[8]) * 100 + "%"
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    else if (element[15] == "Capitalisation") {
      const mt = document.createAttribute("class")
      mt.value = "row cap"
      lt.setAttributeNode(mt)
      const a = document.createAttribute("id")
      a.value = "capc"
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      ct0.setAttributeNode(a)
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = element[8]
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    else if (element[15] == "debutPeriode") {
      const mt = document.createAttribute("class")
      mt.value = "row periode"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = Number(element[8]) * 100 + "%"
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    else {
      const mt = document.createAttribute("class")
      mt.value = "row sf"
      lt.setAttributeNode(mt)
      const ct0 = document.createElement('th')
      ct0.innerHTML = element[0]
      const ct1 = document.createElement('th')
      ct1.innerHTML = element[1]
      const ct2 = document.createElement('th')
      ct2.innerHTML = element[2]
      const ct3 = document.createElement('th')
      ct3.innerHTML = element[3]
      const ct4 = document.createElement('th')
      ct4.innerHTML = element[4]
      const a0 = document.createAttribute("id")
      a0.value = "f2"
      const ct5 = document.createElement('th')
      ct5.innerHTML = element[5]
      const ct6 = document.createElement('th')
      ct6.innerHTML = element[6]
      if (ct5.innerHTML != "") {
        ct5.setAttributeNode(a0)
      } else {
        ct6.setAttributeNode(a0)
      }
      const ct7 = document.createElement('th')
      ct7.innerHTML = element[7]
      const ct8 = document.createElement('th')
      ct8.innerHTML = element[8]
      const ct9 = document.createElement('th')
      ct9.innerHTML = element[9]
      const ct10 = document.createElement('th')
      ct10.innerHTML = element[10]
      const ct11 = document.createElement('th')
      ct11.innerHTML = element[11]
      const ct12 = document.createElement('th')
      ct12.innerHTML = element[12]
      const ct13 = document.createElement('th')
      ct13.innerHTML = element[13]
      const ct14 = document.createElement('th')
      ct14.innerHTML = element[14]
      lt.appendChild(ct0)
      lt.appendChild(ct1)
      lt.appendChild(ct2)
      lt.appendChild(ct3)
      lt.appendChild(ct4)
      lt.appendChild(ct5)
      lt.appendChild(ct6)
      lt.appendChild(ct7)
      lt.appendChild(ct8)
      lt.appendChild(ct9)
      lt.appendChild(ct10)
      lt.appendChild(ct11)
      lt.appendChild(ct12)
      lt.appendChild(ct13)
      lt.appendChild(ct14)
    }
    document.getElementById('tab0').appendChild(lt)
  })
}













