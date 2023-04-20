import { classes } from './classes.js'

function adicionar_atividade(atividade){
    //Criando div da atividade
    const div_elemento=document.createElement('div')
    //Estilizando div
    div_elemento.style.display='flex'
    div_elemento.style.border='2px solid var(--azul-claro)'
    div_elemento.style.borderRadius='var(--curvatura-canto)'
    div_elemento.style.justifyContent='space-between'
    div_elemento.style.overflow='hidden'
    
    //Criando o elemento linkado a atividade
    const elemento=document.createElement('a')
    elemento.classList.add('atividade')
    //Anexando link a div
    div_elemento.appendChild(elemento)
    /*
    //Criando botão de excluir atividade 
    const excluir=document.createElement('button')
    //Anexando botao a div
    div_elemento.appendChild(excluir)
    //Adicionando Classe ao botão
    excluir.classList.add('atividade_excluir')
    //Criando span para icone do botao
    const excluir_icone=document.createElement('span')
    //Adcionando classe ao icone
    excluir_icone.classList.add('material-symbols-outlined')
    //Adicionando valor ao icone
    excluir_icone.innerHTML='close'
    //estilizando icone
    excluir_icone.style.color='var(--branco)'
    excluir_icone.style.fontSize='2em'
    //Anexando icone ao botao
    excluir.appendChild(excluir_icone)
    */
    
    //Anexando o div da atividade a lista de atividades
    document.querySelector('.scroll_atividades').appendChild(div_elemento)
    
    //Criando o título
    const titulo=document.createElement('h2')
    titulo.innerHTML=atividade.titulo
    //Adicionando titulo ao elemento
    elemento.appendChild(titulo)
    
    //Criando area do status da atividade
    const atividade_status=document.createElement('div')
    const tempo_de_atividade=document.createElement('p')
    const status=document.createElement('p')
    
    //Colocando classe
    atividade_status.classList.add('atividade_status')
    tempo_de_atividade.classList.add('duracao_atividade')
    status.classList.add('status_atual')
    
    //Estabelecendo parentesco
    elemento.appendChild(atividade_status)
    atividade_status.appendChild(tempo_de_atividade)
    atividade_status.appendChild(status)
    
    //Iniciando valores
    tempo_de_atividade.innerHTML=`${atividade.duracao}s`
    status.innerHTML=atividade.status

}

let lista_atividades=[]
const manutencaoInst=new classes.manutencao(60,'Equipamento 1','Componente 10','Está manutenção é um teste')
const producaoInst=new classes.producao(60,'Produto Teste',1)
lista_atividades.push(manutencaoInst,producaoInst)

let tempo_backlog=0

window.addEventListener('load',()=>{
    lista_atividades.forEach((atividade)=>{
        adicionar_atividade(atividade)
        tempo_backlog+=(atividade.tempo_estimado)/(60*60)
    })
    const backlog=document.querySelector(".backlog_horas")
    if(tempo_backlog.toFixed(2)>1){
        backlog.innerHTML=`${tempo_backlog.toFixed(2)} h`
    }
    else if((tempo_backlog*60).toFixed(2)>1){
        backlog.innerHTML=`${(tempo_backlog*60).toFixed(2)} min`
    } else {
        backlog.innerHTML=`${(tempo_backlog*60*60).toFixed(2)} s`
        console.log(tempo_backlog)
    }
})





function atualizar_tempo(lista){
    let elementos_duracao=document.querySelectorAll('.duracao_atividade')
    let elementos_status=document.querySelectorAll('.status_atual')
    for(let atividade of lista){
        let duracao=Math.floor((Date.now()-atividade.criacao)/1000)
        if(duracao<60){
            atividade.duracao=`${duracao}s`
        }
        else if(duracao>=60 && duracao<(60*60)){
            let minutos=Math.floor(duracao/60)
            let segundos=duracao%60
            atividade.duracao=`${minutos}min${segundos}s`
        }
        else if(duracao>=(60*60)){
            let horas=Math.floor(duracao/(60*60))
            minutos=Math.floor(duracao%(60*60))
            atividade.duracao=`${horas}h${minutos}min`
        }
        atividade.duracao_real=duracao
        atividade.atraso()

        elementos_duracao[lista.indexOf(atividade)].innerHTML=atividade.duracao
        elementos_status[lista.indexOf(atividade)].innerHTML=atividade.status
        
    }
}

setInterval(()=>{atualizar_tempo(lista_atividades)},1000)
    