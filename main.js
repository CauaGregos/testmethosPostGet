'use strict'

    const openModal = () => {document.getElementById('modal').classList.add('active')}
    const closeModal = () => {
    document.getElementById('modal').classList.remove('active')
    }

    const openModal2 = (nome) => {document.getElementById('modal2').classList.add('active')
    document.querySelector('#title').innerHTML = "Atualizando dados de "+nome
    }
    const closeModal2 = () => {
        document.getElementById('modal2').classList.remove('active')
    }

    const openModal3 = (nome,cep) => {document.getElementById('modal3').classList.add('active')
    document.querySelector('#title2').innerHTML = "Consultando endereço de "+nome
    listdata(cep)
    }
    const closeModal3 = () => {
        document.getElementById('modal3').classList.remove('active')
        clearTable()
    }

    const saveUser = () => {

        var id =  document.getElementById('id').value;
        var nome =  document.getElementById('nome').value;
        var idade =  document.getElementById('idade').value;
        var cep =  document.getElementById('cep').value;

        const json = {
            "id":id,
            "Nome": nome,
            "Idade": idade,
            "CEP": cep
        }
        
        axios.post('http://localhost:3000/aluno',json
        ).then((e) => location.reload() ,
        alert("Dados Enviados com sucesso"))
        .catch((err) => console.log(err))
    }

    const clearFields = () => {
        const fields = document.querySelectorAll('.modal-field')
        fields.forEach(field => field.value = " ")
    }

    const clearTable = () => {
        const fields = document.querySelectorAll('#tst')
        fields.forEach(field => field.remove(field.value))
    }


    const createRow = () => {
            axios.get('http://localhost:3000/alunos').then(response => {const data = response.data
            for(let i = 0; i<data.length; i++){
                const newRow = document.createElement('tr')
                newRow.innerHTML = `
                    <td>${data[i].id}</td>
                    <td>${data[i].Nome}</td>
                    <td>${data[i].Idade}</td>
                    <td>${data[i].CEP}</td>
                    <td>
                        <button type="button" class="button green" onclick="openModal2('${data[i].Nome}')">editar</button>
                        <button type="button" class="button red" onclick="deleteUser(${data[i].id},'${data[i].Nome}')">excluir</button>
                        <button type="button" class="button blue" onclick="openModal3('${data[i].Nome}',${data[i].CEP})">Consultar CEP</button>
                    </td>
                `
                document.querySelector('#tbUser>tbody').appendChild(newRow)
            }
        }).catch()
    }

    const isValidFields = () =>{
        return document.getElementById('form').reportValidity()
  
      }

    const updateTable = () =>{
        const dbUser = readUser()
        dbUser.forEach(createRow)
    }
    
    const deleteUser = (id,nome) => {
        var question = confirm("Deseja mesmo excluir o Aluno: "+nome+"?")
        if (question) {
        axios.delete('http://localhost:3000/alunoDel/'+id).then((e) => location.reload(),
        alert("Dados deletados com sucesso"))
        .catch((err) => JSON.stringify(err))
        }
        else{location.reload()}
    }


    const updateUser = () => {
        var id = document.getElementById('upid').value;
        var nome = document.getElementById('upnome').value;
        var idade = document.getElementById('upidade').value;
        var cep = document.getElementById('upcep').value;


        const json = {
            "id":id,
            "Nome": nome,
            "Idade": idade,
            "CEP": cep
        }

        axios.put('http://localhost:3000/attAluno/' + id, json).then((e) => {location.reload() 
            alert("Dados Atualizados com sucesso")})
            .catch((err) => alert("Não foi possivel atualizar os dados"))
    }

    const listdata = (cep) => {
        
        axios.get('https://api.postmon.com.br/v1/cep/'+cep).then(response => {const data = response.data
                
                const newRow = document.createElement('tr')
                newRow.innerHTML = `
                    <td id ="tst">${data.logradouro}</td>
                    <td id ="tst">${data.bairro}</td>
                    <td id ="tst">${data.cidade}</td>
                    <td id ="tst">${data.cep}</td>
                `
                document.querySelector('#tbCity>tbody').appendChild(newRow)
            
        }).catch(err => {const newRow = document.createElement('tr')
        newRow.innerHTML = `
        <td id ="tst">DADOS NAO LOCALIZADOS ERR:404 CEP NAO ENCONTRADO</td>
    `
    document.querySelector('#tbCity>tbody').appendChild(newRow)})

    }


//eventos
createRow()

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)
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

    