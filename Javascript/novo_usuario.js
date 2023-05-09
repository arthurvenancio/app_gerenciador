import { validacao } from "./validacao.js";

validacao()

document.querySelector('button[type="submit"]').addEventListener('click',(event)=>{
  event.preventDefault()
  const confirma_senha= document.getElementById('senha').value===document.getElementById('confirma_senha').value
  const inputs = Array.from(document.querySelectorAll('.input_cadastro'));
  const campo_invalido = inputs.some(input => !input.validity.valid);
  
  if(confirma_senha && !campo_invalido){
    cadastrar_usuario()
  } else if(!confirma_senha){
    document.getElementById('alerta_confirma_senha').innerHTML='As senhas devem corresponder nos dois campos'
    document.getElementById('alerta_confirma_senha').style.display='flex'
  }

})

async function cadastrar_usuario(){
    const novo_usuario={
        usuario:document.querySelector('#email').value,
        senha:document.querySelector('#senha').value,
        empresa:document.querySelector('#nome').value
    }
    try{
        const resposta=await fetch('http://localhost:3000/cadastro_usuario',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(novo_usuario),
        })
        if(resposta.status==409){
            document.getElementById('alerta_confirma_senha').innerHTML='Usuário já cadastrado, cheque seu email para mais informações.'
            document.getElementById('alerta_confirma_senha').style.display='flex'
        } else if(resposta.status==201){
            window.location.href='../index.html'
        }
    }
    catch(erro){
        console.error(erro)
    }
}