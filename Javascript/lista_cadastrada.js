const parametros = new URLSearchParams(window.location.search);
const lista_selecionada = parametros.get('lista');

const botao_footer = document.querySelector('footer a')
const legenda_botao_footer = document.querySelector('footer a p')
const pesquisa=document.querySelector('.pesquisa_texto')

function telaEquipamentos(){
    document.querySelector('.titulo_header').innerHTML=lista_selecionada

    pesquisa.placeholder="Insira TAG ou nome do equipamento"

    botao_footer.href='/HTML/novo_equipamento.html'
    legenda_botao_footer.innerHTML='Adicionar Equipamento'
}
function telaProdutos(){
    document.querySelector('.titulo_header').innerHTML=lista_selecionada

    pesquisa.placeholder="Insira nome do produto"

    legenda_botao_footer.innerHTML='Adicionar Produto'
}

window.addEventListener('load',()=>{
    
    if(lista_selecionada=='Equipamentos'){
        telaEquipamentos()
    }
    if(lista_selecionada=='Produtos'){
        telaProdutos()
    }
})