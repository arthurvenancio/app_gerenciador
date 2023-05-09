const express = require('express');
const app = express()
app.use(express.json())

const PORT = 3000;

const cors = require('cors');
app.use(cors());
const db=require('../Servidor/db.js')

let usuario_selecionado=null

//verificação de login de usuário
app.post('/login', (req, res) => {
  const selecao = req.body;

  const usuario = db.usuarios_cadastrados.find((cadastro) => {
    return cadastro.usuario === selecao.usuario && cadastro.senha === selecao.senha;
  });

  if (usuario) {
    usuario_selecionado = usuario;
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
    res.sendStatus(201)
  } else{
    res.send({erro:'Usuário já cadastrado'})
    res.sendStatus(409)
  }

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