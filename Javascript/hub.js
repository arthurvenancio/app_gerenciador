class Atividade{
    constructor(tempo_estimado){
        this.tempo_estimado=parseInt(tempo_estimado);
        
        this.duracao=0;
        this.duracao_real=0;
        this.status="Planejado";
        this.criacao=Date.now();
    }
    atraso(){
        if(this.duracao_real>this.tempo_estimado){
            this.status="Atrasado"
        }
    }   
    iniciado(){
        this.status="Em andamento"
    } 
}

class Manutenção extends Atividade{
    constructor(tempo_estimado,equipamento,componente,descricao){
        super(tempo_estimado)
        this.titulo=`Manutenção - ${equipamento} | ${componente}`
        this.descricao=String(descricao)
    }
}
class Produção extends Atividade{
    constructor(tempo_estimado,produto,quantidade){
        super(tempo_estimado)
        this.titulo=`Produção - ${produto}`
        this.quantidade=String(quantidade)
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
    titulo.innerHTML=atividade.titulo
    //Adicionando titulo ao elemento
    elemento.appendChild(titulo)
    //Criando area do status da atividade
    let atividade_status=document.createElement('div')
    let tempo_de_atividade=document.createElement('p')
    let status=document.createElement('p')
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
const manutencao=new Manutenção(60,'Equipamento 1','Componente 10','Está manutenção é um teste')
const producao=new Produção(60,'Produto Teste',1)
lista_atividades.push(manutencao,producao)



window.addEventListener('load',()=>{
    lista_atividades.forEach((atividade)=>{
        adicionar_atividade(atividade)
    })
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

setInterval(()=>{
    atualizar_tempo(lista_atividades)},1000)
    