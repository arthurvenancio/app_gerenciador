import {classes} from '../Javascript/classes.mjs'

const textoLorem='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Sed turpis tincidunt id aliquet. Amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Cursus vitae congue mauris rhoncus. Arcu dictum varius duis at consectetur lorem donec massa. Lorem ipsum dolor sit amet consectetur. Sem fringilla ut morbi tincidunt augue interdum velit euismod.'

const prod_1=JSON.stringify(new classes.producao(60,'Produto Teste',1,'Equipamento 1'))
const manut_1=JSON.stringify(new classes.manutencao(60,'Equipamento 1','Componente 10',textoLorem))

const prod_2=JSON.stringify(new classes.producao(30,'Produto Teste 2',2,'Equipamento 2'))


function reinstanciar(instancia, Objeto){
  const nova_instancia=instancia
  for(let key in Objeto){
    nova_instancia[key]=Objeto[key]
  }
  return nova_instancia
}

const usuarios_cadastrados=[{
    usuario:'teste@email.com',
    senha:'teste',
    empresa:'Teste LTDA'
  },{
    usuario:'teste2@email.com',
    senha:'teste',
    empresa:'Teste 2 LTDA'
  }]
const atividade_cadastradas=[
  {
    usuario:'teste@email.com',
    atividades:[prod_1,manut_1],
  },
  {
    usuario:'teste2@email.com',
    atividades:[prod_2]
  }
]

  const db={
    usuarios_cadastrados,
    atividade_cadastradas,
    reinstanciar,
  }

export default db