const tipo_atividade=document.querySelectorAll('input[type="radio"]')
const area_especifica=document.getElementById('area_atividade_especifica')

//Verificando qual tipo de atividade o usuário selecionou
tipo_atividade.forEach(atividade=>atividade.addEventListener('change',()=>{
    //Limpando a área específica de cada atividade
    area_especifica.innerHTML=""
    //Iniciando a área de Manutenção
    if(atividade.value==='manutencao'){
        //Dropdown de equipamentos
        const dropdown_equipamentos=document.createElement('select')
        const placeholder_equipamentos=document.createElement('option')

        area_especifica.appendChild(dropdown_equipamentos)
        dropdown_equipamentos.appendChild(placeholder_equipamentos)

        dropdown_equipamentos.name='seletor_equipamentos'
        
        placeholder_equipamentos.value=''
        placeholder_equipamentos.setAttribute('disabled',"")
        placeholder_equipamentos.setAttribute('selected',"")
        placeholder_equipamentos.setAttribute('hidden',"")
        placeholder_equipamentos.innerHTML='Selecione Equipamentos'
        // Dropdown de componentes
        const dropdown_componente=document.createElement('select')
        const placeholder_componente=document.createElement('option')

        area_especifica.appendChild(dropdown_componente)
        dropdown_componente.appendChild(placeholder_componente)

        dropdown_componente.name='seletor_componente'
        
        placeholder_componente.value=''
        placeholder_componente.setAttribute('disabled',"")
        placeholder_componente.setAttribute('selected',"")
        placeholder_componente.setAttribute('hidden',"")
        placeholder_componente.innerHTML='Selecione Componente'

        //Inserindo Tempo Esperado da Manutenção
        const tempo=document.createElement('label')
        const tempo_titulo=document.createElement('h3')
        const tempo_input=document.createElement('input')

        area_especifica.appendChild(tempo)
        tempo.appendChild(tempo_titulo)
        tempo.appendChild(tempo_input)

        tempo_titulo.innerHTML='Tempo Esperado de Manutenção'
        tempo_input.type='time'

        // Inserindo Descrição da manutenção
        const descricao=document.createElement('label')
        const descricao_titulo=document.createElement('h3')
        const descricao_area=document.createElement('textarea')

        area_especifica.appendChild(descricao)
        descricao.appendChild(descricao_titulo)
        descricao.appendChild(descricao_area)

        descricao_titulo.innerHTML='Descrição da Manutenção'
        descricao_area.rows="5"
        descricao_area.cols="40"

        //Inserindo Botão de cadastro
        const cadastro=document.createElement('input')
        cadastro.type='submit'
        
        area_especifica.appendChild(cadastro)

        cadastro.value='Cadastrar Manutenção'

        cadastro.classList.add("login_botoes")
        cadastro.classList.add( 'login_entrar')
        cadastro.classList.add('novo_usuario_botao')

    }
    //Iniciando a área de Produção
    if(atividade.value==='producao'){
        const dropdown_produto=document.createElement('select')
        const placeholder_produto=document.createElement('option')
        const novo_produto=document.createElement('option')

        area_especifica.appendChild(dropdown_produto)
        dropdown_produto.appendChild(placeholder_produto)
        dropdown_produto.appendChild(novo_produto)

        dropdown_produto.name='seletor_produto'
        
        placeholder_produto.value=''
        placeholder_produto.setAttribute('disabled',"")
        placeholder_produto.setAttribute('selected',"")
        placeholder_produto.setAttribute('hidden',"")
        placeholder_produto.innerHTML='Selecione Produto'

        novo_produto.value='novo'
        novo_produto.innerHTML='Adicionar Produto'
        //Indo para página de adição de produto
        dropdown_produto.addEventListener('change',()=>{
            if(dropdown_produto.value == 'novo'){
                window.location.href='/HTML/hub.html'
            }
        })

        //Inserindo Quantidade do produto
        const quantidade=document.createElement('label')
        const quantidade_titulo=document.createElement('h3')
        const quantidade_input=document.createElement('input')

        area_especifica.appendChild(quantidade)
        quantidade.appendChild(quantidade_titulo)
        quantidade.appendChild(quantidade_input)

        quantidade_titulo.innerHTML='Quantidade para Produção'
        quantidade_input.type='number'

        //Inserindo Botão de cadastro
        const cadastro=document.createElement('input')
        cadastro.type='submit'
        
        area_especifica.appendChild(cadastro)

        cadastro.value='Cadastrar Produção'

        cadastro.classList.add("login_botoes")
        cadastro.classList.add( 'login_entrar')
        cadastro.classList.add('novo_usuario_botao')
    }
})
)