import { classes } from './classes.js'
fetch('http://localhost:3000/usuario_selecionado').then(res=>res.json()).then(usuario=>document.querySelector('.titulo_header').innerHTML=usuario.empresa)


function enviarAtividade(atividade) {
    const objeto=JSON.stringify(atividade)
    localStorage.setItem('objeto',objeto)
  }

function adicionar_atividade(atividade){
    //Criando div da atividade
    const div_elemento=document.createElement('div')
    
    div_elemento.classList.add('div_atividade')
    div_elemento.setAttribute('data-tipo','atividade_scroll')
    div_elemento.setAttribute('data-status',`${atividade.status}`)
    div_elemento.setAttribute('data-id',`${atividade.id}`)
    
    //Criando o elemento linkado a atividade
    const elemento=document.createElement('a')
    elemento.href=`./atividade.html?tipoAtividade=${atividade.tipo}`
    elemento.classList.add('atividade')
    elemento.addEventListener('click',()=>{enviarAtividade(atividade)})

    
    div_elemento.appendChild(elemento)
  
    //Criando botão de atividade 
    const botao=document.createElement('button')
    div_elemento.appendChild(botao)
    botao.classList.add('atividade_botao')
    
    //Criando icone do botao
    const botao_icone=document.createElement('span')
    botao_icone.classList.add('material-symbols-outlined')
    botao_icone.setAttribute('data-tipo','icone_botao_scroll')
    botao_icone.innerHTML='play_circle'
    botao_icone.style.color='var(--branco)'
    botao_icone.style.fontSize='2em'
    botao.appendChild(botao_icone)
    
    
    //Anexando o div da atividade a lista de atividades
    document.querySelector('.scroll_atividades').appendChild(div_elemento)
    
    //Criando o título
    const titulo=document.createElement('h2')
    titulo.innerHTML=atividade.titulo
    elemento.appendChild(titulo)
    
    //Criando area do status da atividade
    const atividade_status=document.createElement('div')
    const tempo_de_atividade=document.createElement('p')
    const status=document.createElement('p')
    
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
const textoLorem='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sed turpis tincidunt id aliquet. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Cursus vitae congue mauris rhoncus. Arcu dictum varius duis at consectetur lorem donec massa. Lorem ipsum dolor sit amet consectetur. Sem fringilla ut morbi tincidunt augue interdum velit euismod.'


let lista_atividades=[]
const manutencaoInst=new classes.manutencao(60,'Equipamento 1','Componente 10',textoLorem)
const producaoInst=new classes.producao(60,'Produto Teste',1,'Equipamento 1')
lista_atividades.push(manutencaoInst,producaoInst)


let tempo_backlog_producao=0
let tempo_backlog_manutencao=0
const backlog_producao=document.querySelector("[data-backlog='producao']")
const backlog_manutencao=document.querySelector("[data-backlog='manutencao']")

function escritaDeTempo(tempo,elemento){
    if(tempo.toFixed(2)>=1){
        elemento.innerHTML=`${tempo.toFixed(2)} h`
    }
    else if((tempo*60).toFixed(2)>=1){
        elemento.innerHTML=`${(tempo*60).toFixed(2)} min`
    } else {
        elemento.innerHTML=`${(tempo*60*60).toFixed(2)} s`
    }
}

window.addEventListener('load',()=>{
    lista_atividades.forEach((atividade)=>{

        adicionar_atividade(atividade)
        
        //somando backlog
        if(atividade.tipo==='producao'){
            tempo_backlog_producao+=(atividade.tempo_estimado)/(60*60)
        }if(atividade.tipo==='manutencao'){
            tempo_backlog_manutencao+=(atividade.tempo_estimado)/(60*60)
        }
        
            const id="'"+atividade.id+"'"
            const elemento_por_id=document.querySelector(`[data-id=${id}]`)
            
            const botao=elemento_por_id.children[1]
            const icone=botao.children[0]
            
            botao.addEventListener('click',()=>{
                //Iniciar a tarefa pela primeira vez
                if(atividade.status==='Planejado'){
                    atividade.iniciado()
                    botao.style.backgroundColor='var(--amarelo)'
                    icone.innerHTML='pause_circle'
                    elemento_por_id.dataset.status=atividade.status
                } 
                //Pausar a tarefa
                else if(atividade.status==="Em andamento"){
                    atividade.parar()
                    botao.style.backgroundColor='var(--azul-claro)'
                    icone.innerHTML='play_circle'
                    elemento_por_id.dataset.status=atividade.status
                }
                //Continuar a tarefa
                else if(atividade.status==="Pausado"){
                    atividade.continuar()
                    botao.style.backgroundColor='var(--amarelo)'
                    icone.innerHTML='pause_circle'
                    elemento_por_id.dataset.status=atividade.status
                }
            })     
            //Escrita do backlog na tela          
            escritaDeTempo(tempo_backlog_manutencao,backlog_manutencao)
            escritaDeTempo(tempo_backlog_producao,backlog_producao)
             
    })
})

function atualizar_tempo(lista){
    //Tempo decorrido de atividade
    let elementos_duracao=document.querySelectorAll('.duracao_atividade')
    //Status Atual de Atividade
    let elementos_status=document.querySelectorAll('.status_atual')
    for(let atividade of lista){
        if(atividade.status==="Em andamento"){
            let duracao=Math.floor((Date.now()-atividade.inicio_tarefa-atividade.pausas_totais)/1000)
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
        }
        elementos_duracao[lista.indexOf(atividade)].innerHTML=atividade.duracao
        elementos_status[lista.indexOf(atividade)].innerHTML=atividade.status
    }
}

setInterval(()=>{atualizar_tempo(lista_atividades)},1000)
