'use strict'
    // abertura do modal
    const openModal = () => {document.getElementById('modal').classList.add('active')}
    // fechamento do modal
    const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    }

    //---------------PREVENCOES AO INSERIR DADOS----------
    const formInput = document.querySelector("#modal");
    // Indentificar quando escrevemos os dados
    formInput.addEventListener("keypress",function(e){
        // certificar esses dados não são caracteres especiais
     if(!checkChar(e)){
         e.preventDefault();
         alert("Não é possivel digitar caracteres especiais")
     }
    })
    const formInput2 = document.querySelector("#modal2");
    formInput2.addEventListener("keypress",function(e){
     if(!checkChar(e)){
         e.preventDefault();
         alert("Não é possivel digitar caracteres especiais")
     }
    })

    const inputId = document.querySelector("#id");
    // Identificar se os dados do RA são maiores que 5
    inputId.onkeyup = () => { if (inputId.value.length>5){
        inputId.value = ''
        alert("Não é possivel digitar mais que 5 numeros")
    }}
     // Identificar se os dados da idade são maiores que 2
    const inputIdade = document.querySelector("#idade");
    inputIdade.onkeyup = () => { if (inputIdade.value.length>2){
        inputIdade.value = ''
        alert("Não é possivel digitar mais que 2 numeros")
    }}
     // Identificar se os dados do cep são maiores que 8
    const inputCep = document.querySelector("#cep");
    inputCep.onkeyup = () => { if (inputCep.value.length>8){
        inputCep.value = ''
        alert("Não é possivel digitar mais que 8 numeros")
    }}
    //---------------------------------------------------------


// Modal 2 recebe os dados do aluno em contexto.
    const openModal2 = (id,nome,idade,cep) => {document.getElementById('modal2').classList.add('active')
  
    document.querySelector('#title').innerHTML = "Atualizando dados de "+nome
    // recebe os dados do html e coloca nos parametros
       document.getElementById('upid').value = id
        document.getElementById('upnome').value = nome
        document.getElementById('upidade').value = idade
        document.getElementById('upcep').value = cep

        // Execeções de overdate
        const inputupId = document.querySelector("#upid");
        inputupId.onkeyup = () => { if (inputupId.value.length>1){
            inputupId.value = id
            alert("Não é possivel alterar o RA do aluno")
        }}
        const inputupIdade = document.querySelector("#upidade");
        inputupIdade.onkeyup = () => { if (inputupIdade.value.length>2){
            inputupIdade.value = idade
            alert("Não é possivel digitar mais que 2 numeros")
        }}
        const inputupCep = document.querySelector("#upcep");
        inputupCep.onkeyup = () => { if (inputupCep.value.length>8){
            inputupCep.value = cep
            alert("Não é possivel digitar mais que 8 numeros")
        }}

    }
    // fechamento do modal 2
    const closeModal2 = () => {
        document.getElementById('modal2').classList.remove('active')
    }
    // abertura do modal 3 para a consulta de endereco do aluno
    const openModal3 = (nome,cep) => {document.getElementById('modal3').classList.add('active')
    document.querySelector('#title2').innerHTML = "Consultando endereço de "+nome
    // mando o cep que veio do parametro para a função listdata
    listdata(cep)
    }
    //fechamento do modal3
    const closeModal3 = () => {
        document.getElementById('modal3').classList.remove('active')
        clearTable()
    }
// Cadastrar o aluno
    const saveUser = () => {
        // Var´s recebem os dados do HTML
        var id =  document.getElementById('id').value;
        var nome =  document.getElementById('nome').value;
        var idade =  document.getElementById('idade').value;
        var cep =  document.getElementById('cep').value;
        // crio um JSON com esses dados
        const json = {
            "id":id,
            "Nome": nome,
            "Idade": idade,
            "CEP": cep
        }
        
        axios.post('http://localhost:3000/aluno',json
        // se der certo dou um reload e mando um alert
        ).then((e) => location.reload() ,
        alert("Dados Enviados com sucesso"))
        .catch((err) => console.log(err))
    }
    // Limpeza da tabela de endereco
    const clearTable = () => {
        // Limpo os dados das fields para nao duplicar na tela
        const fields = document.querySelectorAll('#tst')
        fields.forEach(field => field.remove(field.value))
    }

    // Criacao das linhas
    const createRow = () => {
            axios.get('http://localhost:3000/alunos').then(response => {const data = response.data
            // listo os dados que encontro no banco atraves do get
            for(let i = 0; i<data.length; i++){
                // crio as linhas 
                const newRow = document.createElement('tr')
                // gero as colunas com os botoes para cada aluno
                newRow.innerHTML = `
                    <td>${data[i].id}</td>
                    <td>${data[i].Nome}</td>
                    <td>${data[i].Idade}</td>
                    <td>${data[i].CEP}</td>
                    <td>
                        <button type="button" class="button green" onclick="openModal2(${data[i].id},'${data[i].Nome}',${data[i].Idade},'${data[i].CEP}')">editar</button>
                        <button type="button" class="button red" onclick="deleteUser(${data[i].id},'${data[i].Nome}')">excluir</button>
                        <button type="button" class="button blue" onclick="openModal3('${data[i].Nome}',${data[i].CEP})">Consultar CEP</button>
                    </td>
                `
                //listo um abaixo do outro (pula linhas)
                document.querySelector('#tbUser>tbody').appendChild(newRow)
            }
        }).catch()
    }

    // deleto os usuarios recebendo o nome e o id do aluno em contexto
    const deleteUser = (id,nome) => {
        // Espero a confirmacao do cliente se posso excluir o aluno
        // usando o nome que vem como parametro
        var question = confirm("Deseja mesmo excluir o Aluno: "+nome+"?")
        // verifico a confirmacao
        if (question) {
        // aciono meu metodo delete dando o id como params para o req
        axios.delete('http://localhost:3000/alunoDel/'+id).then((e) => location.reload(),
        alert("Dados deletados com sucesso"))
        .catch((err) => JSON.stringify(err))
        }
        else{location.reload()}
    }

    // Atualizo os dados do aluno
    const updateUser = () => {
         // Var´s recebem os dados do HTML
        var id = document.getElementById('upid').value;
        var nome = document.getElementById('upnome').value;
        var idade = document.getElementById('upidade').value;
        var cep = document.getElementById('upcep').value;

        // crio um JSON com esses dados
        const json = {
            "id":id,
            "Nome": nome,
            "Idade": idade,
            "CEP": cep
        }
        // Atualizo indicando o id do aluno que quero atualizar
        axios.put('http://localhost:3000/attAluno/' + id, json).then((e) => {location.reload() 
            alert("Dados Atualizados com sucesso")})
            .catch((err) => alert("Não foi possivel atualizar os dados"))
    }

    // listo os dados do endereco
    const listdata = (cep) => {
        // faço um get recuperando os dados do endereco
        // mandando o cep para a api
        axios.get('https://api.postmon.com.br/v1/cep/'+cep).then(response => {const data = response.data
        // listo os dados
        // crio a nova linha e a nova coluna com os dados
        // do cep do aluno em contexto
                const newRow = document.createElement('tr')
                newRow.innerHTML = `
                    <td id ="tst">${data.logradouro}</td>
                    <td id ="tst">${data.bairro}</td>
                    <td id ="tst">${data.cidade}</td>
                    <td id ="tst">${data.cep}</td>
                `
                document.querySelector('#tbCity>tbody').appendChild(newRow)
                // se der erro então no lugar do cep 
                // destaco uma mensagem na coluna
        }).catch(err => {const newRow = document.createElement('tr')
    
        newRow.innerHTML = `
        <td id ="tst">DADOS NAO LOCALIZADOS ERR:404 CEP NAO ENCONTRADO</td>
    `
    document.querySelector('#tbCity>tbody').appendChild(newRow)})

    }

// função para saber quando os caratacteres sao especiais
    function checkChar(e) {
        const char = String.fromCharCode(e.keyCode);
        // sequencia que desejo que exista no codigo
        const pattern = '[a-zA-Z0-9]'

        if(char.match(pattern)){
            return true
        }
        else return false
    }

//eventos
// criação das linhas quando o script é carregado
createRow()
// botao de cadastrar aluno, chama a funcao openModal
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
// onde o id é modalclose tenho um evento que fecha o modal
document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('cancelarUpdate')
    .addEventListener('click', closeModal2)

document.getElementById('salvar').addEventListener('click', saveUser)
document.getElementById('modalClose2').addEventListener('click', closeModal2)
document.getElementById('salvarUpdate').addEventListener('click', updateUser)

document.getElementById('modalClose3')
.addEventListener('click', closeModal3)

    