class Atividade{
    constructor(tempo_estimado){
        this.tempo_estimado=parseInt(tempo_estimado);
        
        this.duracao=0;
        this.duracao_real=0;
        this.status="Planejado";
        this.criacao=Date.now();
    }
    atraso(){
        if(this.duracao_real>this.tempo_estimado){
            this.status="Atrasado"
        }
    }   
    iniciado(){
        this.status="Em andamento"
    } 
}

class Manutencao extends Atividade{
    constructor(tempo_estimado,equipamento,componente,descricao){
        super(tempo_estimado)
        this.titulo=`Manutenção - ${equipamento} | ${componente}`
        this.descricao=String(descricao)
    }
    
}
class Producao extends Atividade{
    constructor(tempo_estimado,produto,quantidade){
        super(tempo_estimado)
        this.titulo=`Produção - ${produto}`
        this.quantidade=String(quantidade)
    }
}

export const classes={
    manutencao:Manutencao,
    producao:Producao,
}