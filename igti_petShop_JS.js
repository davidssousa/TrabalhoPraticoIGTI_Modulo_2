
const dbPetShops = 
[
    { nome: 'PetShopA', percFimSem: 0.2, precoP: 30 , precoG: 50, tosa: 25, dist: '3',  },
    { nome: 'PetShopB', percFimSem: 0.2, precoP: 20 , precoG: 55, tosa: 35, dist: '2',  },
    { nome: 'PetShopC', percFimSem: 0.2, precoP: 35 , precoG: 45, tosa: 25, dist: '4',  },
    { nome: 'PetShopD', percFimSem: 0.2, precoP: 32 , precoG: 46, tosa: 30, dist: '2.5' },
    { nome: 'PetShopE', percFimSem: 0.2, precoP: 40 , precoG: 45, tosa: 22, dist: '7',  },
]

function obterpercBanho(ehFinalSemana, percentual) {
    return ehFinalSemana ? 1 + percentual : 1
}

function obterpercTosa(precisaDeTosa, ehFinalSemana, percentual) {
    return precisaDeTosa ? (ehFinalSemana ? 1 + percentual : 1) : 0
}

function obterPetShopComMenorPreco(listaPetShopsTotalizadas) {
    return listaPetShopsTotalizadas.reduce((a, b) => {        
        if (!a.total) return b;
        if(b.total < a.total) return b;
        if(b.total > a.total) return a;
        return b.dist < a.dist ? b : a; 
    }, { total: 0 })
}

function verificaSeEhFinalSemana(diaSemana) {    
    switch (String(diaSemana).toUpperCase()) {
        case 'SEG': return false;
        case 'TER': return false;
        case 'QUA': return false;
        case 'QUI': return false;
        case 'SEX': return false;
        case 'SAB': return true;
        case 'DOM': return true;
        default:
            return false;
    }
}

function RetornaPetShopMaisBarato(qtdeP, qtdeG, ehFinalSemana) {    
    const listaPetShops = dbPetShops.map(p => {
        banhoP = qtdeP * p.precoP * (ehFinalSemana ? 1 + p.percFimSem : 1)
        banhoG = qtdeG * p.precoG * (ehFinalSemana ? 1 + p.percFimSem : 1)

        const total = banhoP + banhoG

        return { nome: p.nome, total: total, dist: p.dist }
    });  
    
    return obterPetShopComMenorPreco(listaPetShops);
}

// const parte1 = RetornaPetShopMaisBarato(4, 5, false);
// console.log(parte1)


function RetornaPetShopMaisBaratoParte2(qtdeP, qtdeG, ehFinalSemana, precisaDeTosa) {    
    const listaPetShops = dbPetShops.map(p => {
        const percBanho = obterpercBanho(
            ehFinalSemana, p.percFimSem);

        const percTosa = obterpercTosa(precisaDeTosa, 
            ehFinalSemana, p.percFimSem);
        
        banhoP = qtdeP * p.precoP * percBanho;        
        banhoG = qtdeG * p.precoG * percBanho;
        
        tosaP = qtdeP * p.tosa * percTosa;
        tosaG = qtdeG * p.tosa * percTosa;

        const tosa  = tosaP + tosaG
        const total = banhoP + banhoG + tosa

        return { nome: p.nome, total: total, dist: p.dist }
    })

    return obterPetShopComMenorPreco(listaPetShops);
}

const parte2 = RetornaPetShopMaisBaratoParte2(3, 3, false, true);
console.log(parte2)



function RetornaPetShopMaisBaratoParte3(qtdeP, qtdeG, diaSemana, precisaDeTosa) {    
    const listaPetShops = dbPetShops.map(p => {

        const percBanho = obterpercBanho(
            verificaSeEhFinalSemana(diaSemana), p.percFimSem);

        const percTosa = obterpercTosa(precisaDeTosa, 
            verificaSeEhFinalSemana(diaSemana), p.percFimSem);
        
        banhoP = qtdeP * p.precoP * percBanho;        
        banhoG = qtdeG * p.precoG * percBanho;
        
        tosaP = qtdeP * p.tosa * percTosa;
        tosaG = qtdeG * p.tosa * percTosa;

        const tosa  = tosaP + tosaG
        const total = banhoP + banhoG + tosa

        return { nome: p.nome, total: total, dist: p.dist }
    });

    return obterPetShopComMenorPreco(listaPetShops);
}



const parte3 = RetornaPetShopMaisBaratoParte3(3, 3, 'seg', true);
console.log(parte3)
