function Atividade(titulo,equipamento,tempo_estimado){
    this.titulo=String(titulo);
    this.equipamento=String(equipamento);
    this.tempo_estimado=parseFloat(tempo_estimado);
    
    this.duracao=0;
    this.status="Planejado";
    this.criacao=Date.now();

    this.atraso=()=>{
        this.status="Atrasado"
    }
    this.iniciado=()=>{
        this.status="Em andamento"
    }
}

function adicionar_atividade(atividade){
    //Criando o elemento mais externo
    let elemento=document.createElement('a')
    elemento.classList.add('atividade')
    //Anexando o elemento a lista de atividades
    document.querySelector('.scroll_atividades').appendChild(elemento)
    //Criando o título
    let titulo=document.createElement('h2')
    titulo.innerHTML=`${atividade.titulo} | ${atividade.equipamento}`
    //Adicionando titulo ao elemento
    elemento.appendChild(titulo)
    //Criando area do status da atividade
    let atividade_status=document.createElement('div')
    let tempo_de_atividade=document.createElement('p')
    let status=document.createElement('p')
    //Colocando classe
    atividade_status.classList.add('atividade_status')
    tempo_de_atividade.classList.add('duracao_atividade')
    //Estabelecendo parentesco
    elemento.appendChild(atividade_status)
    atividade_status.appendChild(tempo_de_atividade)
    atividade_status.appendChild(status)
    //Iniciando valores
    tempo_de_atividade.innerHTML=`${atividade.duracao}s`
    status.innerHTML=atividade.status

}

let lista_atividades=[]

document.querySelector('#nova_atividade').addEventListener('click',()=>{
    let atividade = new Atividade("Atividade Teste","Equipamento 1",30)
    lista_atividades.push(atividade)
    adicionar_atividade(atividade)
    }
)

function atualizar_tempo(lista){
    let elementos=document.querySelectorAll('.duracao_atividade')
    for(let atividade of lista){
        let duracao=Math.floor((Date.now()-atividade.criacao)/1000)
        if(duracao<60){
            atividade.duracao=`${duracao}s`
        }
        else if(duracao>=60 && duracao<(60*60)){
            let minutos=Math.floor(duracao/60)
            let segundos=duracao%60
            atividade.duracao=`${minutos}:${segundos}`
        }
        else if(duracao>=(60*60)){
            let horas=Math.floor(duracao/(60*60))
            minutos=Math.floor(duracao%(60*60))
            atividade.duracao=`${horas}:${minutos}`
        }
        elementos[lista.indexOf(atividade)].innerHTML=atividade.duracao
    }
}

setInterval(atualizar_tempo(lista_atividades),1000)