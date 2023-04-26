class Atividade{
    constructor(tempo_estimado){
        this.tempo_estimado=parseInt(tempo_estimado);
        
        this.duracao=0;
        this.duracao_real=0;
        this.status="Planejado";
        this.criacao=Date.now();
        this.id=this.criacao+""+Math.random()
        this.pausas_totais=0
        this.inicio_pausa=0
    }
    atraso(){
        if(this.duracao_real>this.tempo_estimado){
            this.status="Atrasado";
        }
    }   
    iniciado(){
        this.status="Em andamento";
        this.inicio_tarefa=Date.now();
    }
    finalizado(){
        this.status='Finalizado'
        this.final_tarefa=Date.now();
    }
    parar(){
        this.status='Pausado'
        this.inicio_pausa=Date.now()
    }
    continuar(){
        this.status='Em andamento'
        this.pausas_totais+=Date.now()-this.inicio_pausa
    }
}

class Manutencao extends Atividade{
    constructor(tempo_estimado,equipamento,componente,descricao){
        super(tempo_estimado)
        this.titulo=`Manutenção - ${equipamento} | ${componente}`
        this.descricao=String(descricao)
        this.tipo='manutencao'
    }
    
}
class Producao extends Atividade{
    constructor(tempo_estimado,produto,quantidade,local){
        super(tempo_estimado)
        this.titulo=`Produção - ${produto}`
        this.quantidade=String(quantidade)
        this.tipo='producao'
        this.local=String(local)
        this.produzidos=0
    }
}
class Usuario{
    constructor(email,senha,empresa){
        this.email=email
        this.senha=senha
        this.empresa=empresa
    }
}
class Produto{
    constructor(nome,equipamento,tempo_esperado){
        this.nome=nome
        this.equipamento=equipamento
        this.tempo_esperado=tempo_esperado
        this.estoque=0
    }
    adicionarEstoque(quantidade){
        this.estoque+=quantidade
    }
    retirarEstoque(quantidade){
        this.estoque-=quantidade
    }
}
class Equipamento{
    constructor(tag,nome,data_compra,valor_compra,capacidade,oee,tempo_setup,tempo_limpeza){
        this.tag=tag
        this.nome=nome
        this.data_compra=data_compra
        this.valor_compra=valor_compra
        this.capacidade=capacidade
        this.oee=oee
        this.tempo_setup=tempo_setup
        this.tempo_limpeza=tempo_limpeza
        this.componentes=[]
        this.manutencao_feita=0
    }
    adicionandoComponente(nome){
        const componente={
            nome_componente:nome,
            quantidade_de_manutencoes:0,
            instalacao_componente:Date.now(),
        }
        this.componentes.push(componente)
    }
    realizandoManutencao(nome_componente){
        this.manutencao_feita+=1
        this.componentes.forEach(componente=>{
            if(componente.nome==nome_componente){
                componente.quantidade_de_manutencoes+=1
            }
        })
    }

}
export const classes={
    manutencao:Manutencao,
    producao:Producao,
    usuario:Usuario,
    produto:Produto,
    equipamento:Equipamento,
}