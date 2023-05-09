import express, { json } from 'express';
const app = express()
app.use(json())

const PORT = 3000;

import cors from 'cors';
app.use(cors());
import db from './db.mjs'

let usuario_selecionado=null

//verificação de login de usuário
app.post('/login', (req, res) => {
  const selecao = req.body;

  const usuario = db.usuarios_cadastrados.find((cadastro) => {
    return cadastro.usuario === selecao.usuario && cadastro.senha === selecao.senha;
  });

  if (usuario) {
    usuario_selecionado = {empresa:usuario.empresa,usuario:usuario.usuario};
    res.send({login:true});
  } else {
    res.send({login:false});
  }
});
//verificação de usuario selecionado
app.get('/usuario_selecionado',(req,res)=>{
  res.json(usuario_selecionado)
})

//cadastro novo usuário
app.post('/cadastro_usuario',(req,res)=>{
  const novo_usuario=req.body
  const usuario_existente = db.usuarios_cadastrados.find((cadastro) => {
    return cadastro.usuario === novo_usuario.usuario && cadastro.senha === novo_usuario.senha && cadastro.empresa === novo_usuario.empresa;
  });

  if(!usuario_existente){
    db.usuarios_cadastrados.push(novo_usuario)
    db.atividade_cadastradas.push({usuario:novo_usuario.usuario,atividades:[]})
    res.sendStatus(201)
  } else{
    res.send({erro:'Usuário já cadastrado'})
    res.sendStatus(409)
  }

})

let atividade_selecionada=null
//enviar atividade para seleção no hub
app.post('/selecao_hub',(req,res)=>{
  atividade_selecionada=JSON.parse(req.body)

  for(let atividade_por_usuario of db.atividade_cadastradas){
    if(atividade_por_usuario.usuario==usuario_selecionado){
      for(let atividade of atividade_por_usuario.atividades){
        const obj_atividade=JSON.parse(atividade)
        if(obj_atividade.id==atividade_selecionada.id){
          Object.assign(obj_atividade,atividade_selecionada)
          res.sendStatus(201)
          break
        }
      }
    }
  }
  
})
//Pegar atividade selecionada
app.get('/atividade_selecionada',(req,res)=>{
  res.json(atividade_selecionada)
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


//Função de enviar email
/*
const nodemailer = require('nodemailer');
async function enviarEmail(email,assunto,texto) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testes.software.av@gmail.com',
        pass: 'Teste@1234',
      },
    });

    const info = await transporter.sendMail({
      from: 'testes.software.av@gmail.com',
      to: email,
      subject: assunto,
      text: texto,
    });

    console.log('E-mail enviado:', info.response);
  } catch (error) {
    console.error(error);
  }
}

enviarEmail('arthurmvenancio@gmail.com','Testando envio','Essa bagaça ai')
*/