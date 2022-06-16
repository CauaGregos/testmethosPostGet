// const listdata = () => {

//     var table = document.getElementById('requestList');

//     const json = axios.get('http://localhost:3000/alunos')
//         console.log(json)
//     for(let i = 0; i<json.length(); i++){
//         let tr = table.insertRow();

//         let RA = tr.insertCell();
//         let nome = tr.insertCell();
//         let idade = tr.insertCell();
//         let cep = tr.insertCell();

//         RA.innerText = json[i].id
//         nome.innerText = json[i].Nome
//         idade.innerText = json[i].Idade
//         cep.innerText = json[i].CEP

//     }

// }

// function openPage(x, y) {
//     var indice = x
//     var target = y
//     var url = './../content/content' + indice + '.html'

//     var xml = new XMLHttpRequest()

//     xml.onreadystatechange = function () {
//         if (xml.readyState == 4 && xml.status == 200) {
//             document.getElementById(target).innerHTML = xml.responseText
//         }
//     }

//     xml.open("GET", url, true)

//     xml.send()
// }