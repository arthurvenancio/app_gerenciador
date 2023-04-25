import { classes } from "./classes.js";
//Começo de coisas para teste
const textoLorem='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sed turpis tincidunt id aliquet. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Cursus vitae congue mauris rhoncus. Arcu dictum varius duis at consectetur lorem donec massa. Lorem ipsum dolor sit amet consectetur. Sem fringilla ut morbi tincidunt augue interdum velit euismod.'
let atividade

if(false){
    atividade = new classes.manutencao(60,'Equipamento 1','Componente 10',textoLorem)
} else{
    atividade = new classes.producao(60,'Produto Teste',1,'Equipamento Teste')
}
//fim de coisas para teste

function mostrarAEsconderB(tipo){
    const elementos=document.querySelectorAll('[data-tipoAtividade]')
    elementos.forEach(elemento=>{
        if(elemento.dataset.tipoatividade==String(tipo)){
            elemento.style.display='flex'
        }else{
            elemento.style.display='none'
        }
    })
}

function telaManutencao(atividade){

    mostrarAEsconderB('manutencao')
    const titulo_header=document.querySelector('.titulo_header')
    titulo_header.innerHTML=atividade.titulo.split('-')[0]
    
    const titulo_main=document.querySelector('.titulo')
    titulo_main.innerHTML=atividade.titulo.split('-')[1].split('|')[0]

    const subtitulo_main=document.querySelector('.subtitulo')
    subtitulo_main.innerHTML=atividade.titulo.split('-')[1].split('|')[1]
    
    const descricao=document.querySelector('.descricao')
    descricao.innerHTML=atividade.descricao

}
function telaProducao(atividade){

    mostrarAEsconderB('producao')

    const titulo_header=document.querySelector('.titulo_header')
    titulo_header.innerHTML=atividade.titulo.split('-')[0]

    const titulo_main=document.querySelector('.titulo')
    titulo_main.innerHTML=atividade.titulo.split('-')[1]

    const subtitulo_main=document.querySelector('.subtitulo')
    subtitulo_main.innerHTML=`Produzindo em ${atividade.local}`

    const contator=document.querySelector('#contador')
    contator.innerHTML=`${atividade.produzidos} de ${atividade.quantidade}`


    //Acionando o alerta
    const botoes_contador=document.querySelectorAll('.area_botoes')[0]
    const alerta_surplus=document.querySelector('.alerta')
    botoes_contador.addEventListener('click',()=>{
        
        aumentar_contador.addEventListener('click',()=>{
            if(atividade.produzidos>atividade.quantidade){
                alerta_surplus.style.display='block'
            }
        })
        diminuir_contador.addEventListener('click',()=>{
            if(atividade.produzidos<=atividade.quantidade){
                alerta_surplus.style.display='none'
            }
        })
        
    })

    const diminuir_contador=document.querySelectorAll('.botao_contador')[0]

    diminuir_contador.addEventListener('click',(event)=>{
        event.preventDefault()
        if(atividade.produzidos>0){
            atividade.produzidos-=1
        }
        contator.innerHTML=`${atividade.produzidos} de ${atividade.quantidade}`
    }
    )
    
    const aumentar_contador=document.querySelectorAll('.botao_contador')[1]
    aumentar_contador.addEventListener('click',(event)=>{
        event.preventDefault()
        atividade.produzidos+=1
        contator.innerHTML=`${atividade.produzidos} de ${atividade.quantidade}`
        }
    )   

}

window.addEventListener('load',()=>{
    if(atividade.tipo=='manutencao'){
        telaManutencao(atividade)
    }
    if(atividade.tipo=='producao'){
        telaProducao(atividade)
    }
})