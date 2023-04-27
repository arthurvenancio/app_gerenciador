const produto = JSON.parse(localStorage.getItem('objeto'));

const elementos = document.querySelectorAll('[data-info]')

function escrevendoInfo(elemento,produto){
    const info=elemento.dataset.info
    elemento.innerHTML=produto[info]
    if(!produto[info] && info=='descricao'){
        elemento.innerHTML='<em>Descrição não fornecido</em>'
    }
}

elementos.forEach(elemento=>{
    escrevendoInfo(elemento,produto)
})