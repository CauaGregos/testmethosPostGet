const express = require('express')
const bd = require('./data/bd')
const rotas = require('./data/rotas/rotas')
var cors = require('cors')

function middleWareGlobal(req,res,next){
    next();
}

async function ativacaoDoServidor(){
    const app = express();
    // app.use(cors)
    app.use(express.json());
    app.use(middleWareGlobal)

    app.post ('/aluno',rotas.cadastrarAluno)
    app.put('/aluno/:nome',rotas.atualizarAluno)
    app.delete('/alunoDel/:nome',rotas.excluirAluno)
    app.get('/aluno/:nome', rotas.getAluno)
    app.get('/alunos',rotas.recupereTodos)
    
    console.log('Servidor ativo')
    app.listen(3000);
}
ativacaoDoServidor();