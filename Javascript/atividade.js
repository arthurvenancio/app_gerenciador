import { classes } from "./classes.js";
const textoLorem='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sed turpis tincidunt id aliquet. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Cursus vitae congue mauris rhoncus. Arcu dictum varius duis at consectetur lorem donec massa. Lorem ipsum dolor sit amet consectetur. Sem fringilla ut morbi tincidunt augue interdum velit euismod.'
let atividade=new classes.manutencao(60,'Equipamento 1','Componente 10',textoLorem)
/*
//Randomizar tipo de atividade
if(Math.random()<=0.5){
    atividade = new classes.manutencao(60,'Equipamento 1','Componente 10',textoLorem)
} else{
    atividade = new classes.producao(60,'Produto Teste',1)
}
*/

function telaManutencao(atividade){
    //Selecionando Main
    const main=document.querySelector('main')
    
    //Ajustando Título do Header
    const titulo_header=document.querySelector('.titulo_header')
    titulo_header.innerHTML=atividade.titulo.split('-')[0]
    
    //Colocando Título da Manutenção
    const titulo_main=document.createElement('h3')
    main.appendChild(titulo_main)
    titulo_main.innerHTML=atividade.titulo.split('-')[1].split('|')[0]
    titulo_main.style.marginBottom='0'
    titulo_main.style.paddingBottom='0.1em'

    //Colocando Subtítulo
    const subtitulo_main=document.createElement('h4')
    main.appendChild(subtitulo_main)
    subtitulo_main.innerHTML=atividade.titulo.split('-')[1].split('|')[1]
    subtitulo_main.style.marginTop='0'
    subtitulo_main.style.paddingTop='0'
    subtitulo_main.style.fontStyle='italic'
    subtitulo_main.style.fontSize='0.9em'
    subtitulo_main.style.color='var(--branco-escuro)'

    //Colocando Descrição
    const descricao=document.createElement('p')
    main.appendChild(descricao)
    descricao.innerHTML=atividade.descricao
    descricao.style.textAlign='justify'

    //Colocando Area de Anotação 
    const label_anotacao=document.createElement('label')
    main.appendChild(label_anotacao)
    const titulo_anotacao=document.createElement('h3')
    titulo_anotacao.innerHTML='Anotações'
    titulo_anotacao.style.marginBottom='0'
    const area_anotacao=document.createElement('textarea')
    area_anotacao.style.height='6em'
    area_anotacao.classList.add('input_cadastro')
    label_anotacao.appendChild(titulo_anotacao)
    label_anotacao.appendChild(area_anotacao)

    //Colocando Área de Botões
    const area_botoes=document.createElement('div')
    main.appendChild(area_botoes)
    area_botoes.style.display='flex'
    area_botoes.style.gap='1em'

    //Colocando botão de erro
    const botao_erro=document.createElement('button')
    area_botoes.appendChild(botao_erro)
    botao_erro.classList.add("login_botoes")
    botao_erro.style.width='40vw'
    botao_erro.style.color='black'
    botao_erro.style.backgroundColor='var(--amarelo)'

    const icone_botao_erro=document.createElement('span')
    icone_botao_erro.classList.add('material-symbols-outlined')
    icone_botao_erro.innerHTML='warning'
    icone_botao_erro.style.fontSize='5em'
    botao_erro.appendChild(icone_botao_erro)
    
    const legenda_icone_botao_erro=document.createElement('p')
    legenda_icone_botao_erro.style.marginTop='0'
    legenda_icone_botao_erro.innerHTML='Problema na Manutenção'
    botao_erro.appendChild(legenda_icone_botao_erro)

    //Colocando botão de finalizar
    const botao_finalizar=document.createElement('button')
    area_botoes.appendChild(botao_finalizar)
    botao_finalizar.classList.add("login_botoes")
    botao_finalizar.style.width='40vw'
    botao_finalizar.style.color='black'
    botao_finalizar.style.backgroundColor='var(--azul-claro)'

    const icone_botao_finalizar=document.createElement('span')
    icone_botao_finalizar.classList.add('material-symbols-outlined')
    icone_botao_finalizar.innerHTML='task_alt'
    icone_botao_finalizar.style.fontSize='5em'
    botao_finalizar.appendChild(icone_botao_finalizar)
    
    const legenda_icone_botao_finalizar=document.createElement('p')
    legenda_icone_botao_finalizar.style.marginTop='0'
    legenda_icone_botao_finalizar.innerHTML='Finalizar Manutenção'
    botao_finalizar.appendChild(legenda_icone_botao_finalizar)

}

function telaProducao(atividade){
    //Selecionando Main
    const main=document.querySelector('main')
    //Ajustando Título do Header
    const titulo_header=document.querySelector('.titulo_header')
    titulo_header.innerHTML=atividade.titulo.split('-')[0]
}

window.addEventListener('load',()=>{
    if(atividade.tipo=='manutencao'){
        telaManutencao(atividade)
    }
    if(atividade.tipo=='producao'){
        telaProducao(atividade)
    }
})