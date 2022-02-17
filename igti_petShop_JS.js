
const dbPetShops_P1 = 
[
    { nome: 'PetShopA', percFimSem: 0.2, precoP: 30 , precoG: 50, dist: '3',  },
    { nome: 'PetShopB', percFimSem: 0.2, precoP: 20 , precoG: 55, dist: '2',  },
    { nome: 'PetShopC', percFimSem: 0.2, precoP: 35 , precoG: 45, dist: '4',  },
]

const dbPetShops_P2_P3 = 
[
    { nome: 'PetShopA', percFimSem: 0.2, precoP: 30 , precoG: 50, tosa: 25, dist: '3',  },
    { nome: 'PetShopB', percFimSem: 0.2, precoP: 20 , precoG: 55, tosa: 35, dist: '2',  },
    { nome: 'PetShopC', percFimSem: 0.2, precoP: 35 , precoG: 45, tosa: 25, dist: '4',  },
    { nome: 'PetShopD', percFimSem: 0.2, precoP: 32 , precoG: 46, tosa: 30, dist: '2.5' },
    { nome: 'PetShopE', percFimSem: 0.2, precoP: 40 , precoG: 45, tosa: 22, dist: '7',  },
]

function obterPercBanho(ehFinalSemana, percentual) {
    return ehFinalSemana ? 1 + percentual : 1
}

function obterPercTosa(precisaDeTosa, ehFinalSemana, percentual) {
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
    const listaPetShops = dbPetShops_P1.map(p => {

        const percBanho = obterPercBanho(
            ehFinalSemana, p.percFimSem);

        banhoP = qtdeP * p.precoP * percBanho;
        banhoG = qtdeG * p.precoG * percBanho;

        const total = banhoP + banhoG

        return { nome: p.nome, total: total, dist: p.dist }
    });  
    
    return obterPetShopComMenorPreco(listaPetShops);
}

const parte1 = RetornaPetShopMaisBarato(2, 5, true);
console.log('Parte 1:', parte1)


function RetornaPetShopMaisBaratoParte2(qtdeP, qtdeG, ehFinalSemana, precisaDeTosa) {    
    const listaPetShops = dbPetShops_P2_P3.map(p => {
        const percBanho = obterPercBanho(
            ehFinalSemana, p.percFimSem);

        const percTosa = obterPercTosa(precisaDeTosa, 
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

const parte2 = RetornaPetShopMaisBaratoParte2(5, 8, true, true);
console.log('Parte 2:', parte2)



function RetornaPetShopMaisBaratoParte3(qtdeP, qtdeG, diaSemana, precisaDeTosa) {    
    const listaPetShops = dbPetShops_P2_P3.map(p => {

        const percBanho = obterPercBanho(
            verificaSeEhFinalSemana(diaSemana), p.percFimSem);

        const percTosa = obterPercTosa(precisaDeTosa, 
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



const parte3 = RetornaPetShopMaisBaratoParte3(5, 7, 'sab', true);
console.log('Parte 3:', parte3)
