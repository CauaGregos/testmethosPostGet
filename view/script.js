const saveUser = () => {
    
        var nome =  document.getElementById('nome').value;
        var idade =  document.getElementById('idade').value;
        var cep =  document.getElementById('cep').value;


        axios({
            method:'POST',
            url:'http://localhost:3000/aluno',
            data:JSON.stringify({
                Nome: nome,
                Idade: parseInt(idade),
                CEP: cep
            })
        })
}
document.getElementById('saveData').addEventListener('click', saveUser)