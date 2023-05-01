function enviarAtividade(objeto){
    fetch('http://localhost:3000/objetos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto)
      })
}