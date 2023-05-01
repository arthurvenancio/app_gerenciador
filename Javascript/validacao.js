const mensagem_typeMismatch={
    email:'O formato de email deve ser: usuario@email.com',
}
const mensagem_valueMissing={
    email:'Email não preenchido',
    password:'Senha não preenchida',
}

function validacaoInput(input){
    const obj_validacao=input.validity
    const tipo_input=input.type
    let tipo_erro

    input.addEventListener('invalid', (event) => {
        event.preventDefault()
        input.setCustomValidity('')
    })

    if(!obj_validacao.valid){
        for (const erro in obj_validacao ){
            if(obj_validacao[erro]){
                console.log(erro)
                tipo_erro=erro
                break
            }
        }
        switch(tipo_erro){
            case 'typeMismatch':
                estiloErro(input,mensagem_typeMismatch[tipo_input])
                break
            case 'valueMissing':
                estiloErro(input,mensagem_valueMissing[tipo_input])
                break
        }        
    } else{
        estiloValido(input)
    }
}

function estiloErro(input,texto_span){
    const id_alerta=`alerta_${input.id}`
    const alerta=document.getElementById(id_alerta)
    alerta.innerHTML=texto_span
    alerta.style.display='block'

    input.style.borderColor='var(--vermelho)'
}
function estiloValido(input){
    const id_alerta=`alerta_${input.id}`
    const alerta=document.getElementById(id_alerta)
    alerta.style.display='none'

    input.style.borderColor='var(--azul-claro)'
}

function validacao(){
    document.querySelectorAll('.input_cadastro').forEach(input=>{
        input.addEventListener('blur',()=>{validacaoInput(input)})
    })
    document.querySelector('button[type="submit"]').addEventListener('click',()=>{
        document.querySelectorAll('.input_cadastro').forEach(input=>{
            validacaoInput(input)
        })
    })
}
validacao()


/*
badInput: false
customError: false
patternMismatch: false
rangeOverflow: false
rangeUnderflow: false
stepMismatch: false
tooLong: false
tooShort:false
typeMismatch: false
valid: false
valueMissing: true
*/