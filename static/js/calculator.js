

function sum(e) {
    e.preventDefault()
    let s1 = document.getElementById('s1')
    let s2 = document.getElementById('s2')
    let mod1 = document.getElementById('mod1')
    let zbir_rez = document.getElementById('sR')

    s1 = parseInt(s1.value)
    s2 = parseInt(s2.value)
    mod1 = parseInt(mod1.value)

    if(isNaN(s1) || isNaN(s2) || isNaN(mod1)) {
        alert('Unesite ispravne brojeve!')
    }

    zbir_rez.value = zbir(s1, s2, mod1)
}

function raz(e){
    e.preventDefault()
    let o1 = document.getElementById('o1')
    let o2 = document.getElementById('o2')
    let mod2 = document.getElementById('mod2')
    let razlika_rez = document.getElementById('oR')

    o1 = parseInt(o1.value)
    o2 = parseInt(o2.value)
    mod2 = parseInt(mod2.value)

    if(isNaN(o1) || isNaN(o2) || isNaN(mod2)) {
        alert('Unesite ispravne brojeve!')
    }

    razlika_rez.value=razlika(o1, o2, mod2);
    

}

function pr(e){
    e.preventDefault()
    let m1 = document.getElementById('m1')
    let m2 = document.getElementById('m2')
    let mod3 = document.getElementById('mod3')
    let pr_rez = document.getElementById('mR')

    m1 = parseInt(m1.value)
    m2 = parseInt(m2.value)
    mod3 = parseInt(mod3.value)

    if(isNaN(m1) || isNaN(m2) || isNaN(mod3)) {
        alert('Unesite ispravne brojeve!')
    }

    pr_rez.value=proizvod(m1, m2, mod3);
    

}

function najzd(e){
    e.preventDefault()
    let nzd1= document.getElementById('nzd1')
    let nzd2 = document.getElementById('nzd2')
    let nzd_rez = document.getElementById('nzdR')

    nzd1 = parseInt(nzd1.value)
    nzd2 = parseInt(nzd2.value)
    

    if(isNaN(nzd1) || isNaN(nzd2) ) {
        alert('Unesite ispravne brojeve!')
    }

    nzd_rez.value=nzd(nzd1, nzd2);
    

}

function najzs(e){
    e.preventDefault()
    let nzs1= document.getElementById('nzs1')
    let nzs2 = document.getElementById('nzs2')
    let nzs_rez = document.getElementById('nzsR')

    nzs1 = parseInt(nzs1.value)
    nzs2 = parseInt(nzs2.value)
    

    if(isNaN(nzs1) || isNaN(nzs2) ) {
        alert('Unesite ispravne brojeve!')
    }

    nzs_rez.value=nzs(nzs1, nzs2);
    

}


function linnzd(e){
    e.preventDefault()
    let linnzd1= document.getElementById('linnzd1')
    let linnzd2 = document.getElementById('linnzd2')
    let linnzd_rez = document.getElementById('linnzdR')
    let details = document.getElementById('details-container')
    let tableConteiner = document.getElementById('collapseExample')

    linnzd1 = parseInt(linnzd1.value)
    linnzd2= parseInt(linnzd2.value)
    

    if(isNaN(linnzd1) || isNaN(linnzd2) ) {
        alert('Unesite ispravne brojeve!')
    }

    tmp = blankinship(linnzd1, linnzd2)
    linnzd_rez.value=tmp[0] + '=' + tmp[1] + '*' + linnzd1 + ' + ' + tmp[2] + ' * ' + linnzd2 ;

    details.style.visibility = 'visible'
    tableConteiner.innerHTML = tmp[3]
}


function trinverz(e){
    e.preventDefault()
    let inverzBr= document.getElementById('inverzBr')
    let inverzMod = document.getElementById('inverzMod')
    let inverzR_rez= document.getElementById('inverzR')

    inverzBr = parseInt(inverzBr.value)
    inverzMod= parseInt(inverzMod.value)
    

    if(isNaN(inverzBr) || isNaN(inverzMod) ) {
        alert('Unesite ispravne brojeve!')
    }

    inverzR_rez.value=inverzni(inverzBr, inverzMod);
    

}

function reskongr(e) {
    e.preventDefault()
    let x = document.getElementById('kongrA')
    let y = document.getElementById('kongrB')
    let kmod = document.getElementById('kongrMod')
    let rkongr_rez = document.getElementById('kongrR')

    x = parseInt(x.value)
    y = parseInt(y.value)
    kmod = parseInt(kmod.value)

    if(isNaN(x) || isNaN(y) || isNaN(kmod)) {
        alert('Unesite ispravne brojeve!')
    }

    rkongr_rez.value = kongruencija(x,y,kmod)
}

function resstkongr(e) {
    e.preventDefault()
    let stepA = document.getElementById('stepA')
    let stepK = document.getElementById('stepK')
    let stepMod = document.getElementById('stepMod')
    let stepR_rez = document.getElementById('stepR')

    stepA = parseInt(stepA.value)
    stepK = parseInt(stepK.value)
    stepMod = parseInt(stepMod.value)

    if(isNaN(stepA) || isNaN(stepK) || isNaN(stepMod)) {
        alert('Unesite ispravne brojeve!')
    }

    stepR_rez.value = expmod(stepA, stepK, stepMod)
}

function resojl(e) {
    e.preventDefault()
    let brojn = document.getElementById('brojn')
    let ojlerR_rez = document.getElementById('ojlerR')
    
    brojn = parseInt(brojn.value)
    

    if(isNaN(brojn)) {
        alert('Unesite ispravne brojeve!')
    }

    ojlerR_rez.value = euler(brojn)
}


function myFunction() {
    var x = document.getElementById('uputstvo');
    if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else {
      x.style.visibility = "hidden";
    }
  }



