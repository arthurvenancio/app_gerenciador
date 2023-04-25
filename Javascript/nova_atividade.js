const tipo_atividade=document.querySelectorAll('input[type="radio"]')

const secoes=document.querySelectorAll('section')

//Verificando qual tipo de atividade o usuário selecionou
tipo_atividade.forEach(atividade=>atividade.addEventListener('change',()=>{

    secoes.forEach(secao=>{
        secao.style.display='none'
    })

    if(atividade.value==='manutencao'){
        document.querySelector('[data-tipoAtividade=manutencao]').style.display='flex'
    }
    if(atividade.value==='producao'){
        document.querySelector('[data-tipoAtividade=producao]').style.display='flex'
    }
})
)
const cadastro=document.querySelector('[data-cadastro]')
cadastro.addEventListener('click',()=>{
    window.location.href='/HTML/hub.html'
})
