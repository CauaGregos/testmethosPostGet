const saveUser = () => {
    
        var nome =  document.getElementById('nome').value;
        var idade =  document.getElementById('idade').value;
        var cep =  document.getElementById('cep').value;

        const json = {
            "Nome": nome,
	        "Idade": idade,
	        "CEP": cep
        }
        
        axios.post('http://localhost:3000/aluno',json
        ).then((e) => location.reload() ,
        alert("Dados Enviados com sucesso"))
        .catch((err) => console.log(err))
        
        
}
document.getElementById('saveData').addEventListener('click', saveUser)
