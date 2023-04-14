function Atividade(titulo,equipamento,tempo_estimado){
    this.titulo=String(titulo);
    this.equipamento=String(equipamento);
    this.tempo_estimado=parseFloat(tempo_estimado);
    
    this.status="Planejado";
    this.criacao=Date.now();

    this.atraso=()=>{
        this.status="Atrasado"
    }
    this.iniciado=()=>{
        this.status="Em andamento"
    }
}
/*
<a href="#" class="atividade">
                <h2>Título Atividade</h2>
                <div class="atividade_status">
                    <p>Tempo de Atividade</p>
                    <p>Status da Atividade</p>
                </div>
            </a>
*/
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
    //Colocando classes
    atividade_status.classList.add('atividade_status')
    tempo_de_atividade.classList.add('duracao_atividade')
    //Estabelecendo parentesco
    elemento.appendChild(atividade_status)
    atividade_status.appendChild(tempo_de_atividade)
    atividade_status.appendChild(status)
    //Iniciando valores
    tempo_de_atividade.innerHTML='0 s'
    status.innerHTML=atividade.status

}
document.querySelector('#nova_atividade').addEventListener('click',()=>{
    let atividade = new Atividade("Atividade Teste","Equipamento 1",30)
    adicionar_atividade(atividade)
    }
)
