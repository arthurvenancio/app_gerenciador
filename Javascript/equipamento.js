const equipamento = JSON.parse(localStorage.getItem('objeto'));
console.log(equipamento.componentes)

const elementos = document.querySelectorAll('[data-info]')


elementos.forEach(elemento=>{   
    escrevendoInfo(elemento,equipamento)
})
equipamento.componentes.forEach(componente=>{
    escrevendoComponentes(componente)
})

function escrevendoInfo(elemento,equipamento){
    const info=elemento.dataset.info
    switch(info){
        case 'data_compra':
            const data = new Date(equipamento.data_compra); 
            const dia = data.getDate().toString().padStart(2, '0'); 
            const mes = (data.getMonth() + 1).toString().padStart(2, '0');
            const ano = data.getFullYear().toString();
            elemento.innerHTML=`${dia}/${mes}/${ano}`
        break
        case'oee_real':
            elemento.innerHTML=`${equipamento.oee_real*100}%`
            if(equipamento.oee_real<(equipamento.oee_esperado-0.05)){
                elemento.style.color='var(--vermelho)'
            } else if(equipamento.oee_real<equipamento.oee_esperado){
                elemento.style.color='var(--amarelo)'
            }
        break
        default:
            elemento.innerHTML=equipamento[info]
    }
}
function escrevendoComponentes(componente){
    const lista=document.querySelector('.lista_componentes')

    const area_componente=document.createElement('div')
    area_componente.classList.add('componente')
    lista.appendChild(area_componente)

    const span=document.createElement('span')
    const nome=document.createElement('h4')
    area_componente.appendChild(span.appendChild(nome))
    
    const div_numeros=document.createElement('div')
    div_numeros.classList.add('central')
    const n_manutencao=document.createElement('h4')
    n_manutencao.classList.add('manutencoes_componentes')
    const legenda_n_manutencao=document.createElement('h4')
    legenda_n_manutencao.classList.add('legenda_manutencoes_componentes')
    area_componente.appendChild(div_numeros)
    div_numeros.appendChild(n_manutencao)
    div_numeros.appendChild(legenda_n_manutencao)

    nome.innerHTML=componente.nome_componente
    n_manutencao.innerHTML=componente.quantidade_de_manutencoes
    legenda_n_manutencao.innerHTML='Manutenções'

}