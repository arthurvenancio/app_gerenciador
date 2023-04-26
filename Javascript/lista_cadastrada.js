import { classes } from "./classes.js";
//inicio coisas para teste
const equipamento=new classes.equipamento('EQUIP-001','Equipamento Teste',Date.now(),100,1,0.9,30000,60000)
const produto=new classes.produto('Produto Teste','Equipamento Teste',60000)

let lista_equipamentos=[equipamento,equipamento,equipamento]
let lista_produtos=[produto,produto,produto]

//fim coisas para teste

const parametros = new URLSearchParams(window.location.search);
const lista_selecionada = parametros.get('lista');

const botao_footer = document.querySelector('footer a')
const legenda_botao_footer = document.querySelector('footer a p')
const pesquisa=document.querySelector('.pesquisa_texto')
const scroll=document.querySelector('.scroll')

function telaEquipamentos(){
    document.querySelector('.titulo_header').innerHTML=lista_selecionada

    pesquisa.placeholder="Insira TAG ou nome do equipamento"

    botao_footer.href='/HTML/novo_equipamento.html'
    legenda_botao_footer.innerHTML='Adicionar Equipamento'

    lista_equipamentos.forEach(equipamento=>{
        const link_equipamento=document.createElement('a')
        scroll.appendChild(link_equipamento)
        link_equipamento.classList.add('produto')
        
        const tag_equipamento=document.createElement('h3')
        link_equipamento.appendChild(tag_equipamento)
        tag_equipamento.innerHTML=equipamento.tag
        const nome_equipamento=document.createElement('span')
        nome_equipamento.innerHTML=`${equipamento.nome}`
        link_equipamento.appendChild(nome_equipamento)
        nome_equipamento.classList.add('nome_equipamento')
    })


}
function telaProdutos(){
    document.querySelector('.titulo_header').innerHTML=lista_selecionada

    pesquisa.placeholder="Insira nome do produto"

    botao_footer.href='/HTML/novo_produto.html'
    legenda_botao_footer.innerHTML='Adicionar Produto'

    lista_produtos.forEach(produto=>{
        const link_produto=document.createElement('a')
        scroll.appendChild(link_produto)
        link_produto.classList.add('produto')
        
        const titulo_produto=document.createElement('h3')
        link_produto.appendChild(document.createElement('span').appendChild(titulo_produto))
        titulo_produto.innerHTML=produto.nome
        
        const estoque_produto=document.createElement('h3')
        const espaco_estoque=document.createElement('div')
        link_produto.appendChild(espaco_estoque)
        espaco_estoque.appendChild(estoque_produto)
        espaco_estoque.classList.add('estoque')
        estoque_produto.innerHTML=produto.estoque
        estoque_produto.style.margin='0.1em 0'
        
        const legenda_estoque=document.createElement('h4')
        espaco_estoque.appendChild(legenda_estoque)
        legenda_estoque.innerHTML='Unidades'
        legenda_estoque.classList.add('legenda_estoque')


    })
}

window.addEventListener('load',()=>{
    
    if(lista_selecionada=='Equipamentos'){
        telaEquipamentos()
    }
    if(lista_selecionada=='Produtos'){
        telaProdutos()
    }
})