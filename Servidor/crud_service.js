const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json())
app.use(cors());
const PORT = 3000;

const db=require('../Servidor/db.js')

let usuario_selecionado=null

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

app.get('/usuario_selecionado',(req,res)=>{
  res.json(usuario_selecionado)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

