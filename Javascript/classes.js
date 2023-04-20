class Atividade{
    constructor(tempo_estimado){
        this.tempo_estimado=parseInt(tempo_estimado);
        
        this.duracao=0;
        this.duracao_real=0;
        this.status="Planejado";
        this.criacao=Date.now();
        this.id=this.criacao+""+Math.random()
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
    constructor(tempo_estimado,produto,quantidade){
        super(tempo_estimado)
        this.titulo=`Produção - ${produto}`
        this.quantidade=String(quantidade)
        this.tipo='producao'
    }
}

export const classes={
    manutencao:Manutencao,
    producao:Producao,
}