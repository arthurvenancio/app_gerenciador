import { classes } from "./classes.mjs";
import db from "../Servidor/db.mjs";

async function atividade_selecionada(){
    const resposta = await fetch('http://localhost:3000/atividade_selecionada')
    const objeto_atividade=await resposta.json()

    const parametros = new URLSearchParams(window.location.search);
    const tipo_atividade = parametros.get('tipoAtividade');
    
    console.log(objeto_atividade)
    
    if(tipo_atividade=='manutencao'){
        const inst_man=new classes.manutencao()
        return Object.assign(inst_man,objeto_atividade)
    } else{
        return Object.assign(new classes.producao(),objeto_atividade)
    }
}


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

window.addEventListener('load',async()=>{
    const atividade = await atividade_selecionada()
    console.log(atividade)
    if(atividade.tipo=='manutencao'){
        telaManutencao(atividade)
    }
    if(atividade.tipo=='producao'){
        telaProducao(atividade)
    }
})