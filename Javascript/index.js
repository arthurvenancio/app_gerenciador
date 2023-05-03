import { validacao } from "./validacao.js";

validacao()

document.querySelector('button[type="submit"]').addEventListener('click',(event)=>{
  event.preventDefault()
  const alerta=document.querySelector('#alerta_senha')
    alerta.innerHTML='Carregando'
    alerta.style.display='block'
  login()
})



async function login(){

  const usuario_input=document.querySelector('input[type="email"]').value.toLowerCase()
  const senha_input=document.querySelector('input[type="password"]').value.toLowerCase()
  let obj_respota=null
  try{
    const resposta= await fetch('http://localhost:3000/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: usuario_input,
        senha: senha_input
      })
    })
    obj_respota=await resposta.json()
  }
  catch(error){
    console.error(error)
  }
  

  if(obj_respota.login){
    console.log('logado com sucesso')
    
    window.location.href='../HTML/hub.html'
  } else if(!obj_respota.login){
    const elemento_usuario=document.querySelector('input[type="email"]')
    const elemento_senha=document.querySelector('input[type="password"]')

    elemento_senha.style.borderColor='var(--vermelho)'
    elemento_usuario.style.borderColor='var(--vermelho)'

    const alerta=document.querySelector('#alerta_senha')
    alerta.innerHTML='Email ou Senha Incorreto'
    alerta.style.display='block'
  }
  
  
  
}
