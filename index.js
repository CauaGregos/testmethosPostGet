const express = require('express')
const bd = require('./data/bd')
const rotas = require('./data/rotas/rotas')
var cors = require('cors')


function middleWareGlobal(req,res,next){
    next();
}

async function ativacaoDoServidor(){
    const app = express();
    app.use(express.json());
    app.use(middleWareGlobal)
    
    // Evitar erro do CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });


    app.post ('/aluno',rotas.cadastrarAluno)
    app.put('/attAluno/:id',rotas.atualizarAluno)
    app.delete('/alunoDel/:id',rotas.excluirAluno)
    app.get('/aluno/:id', rotas.getAluno)
    app.get('/alunos',rotas.recupereTodos)
    
    console.log('Servidor ativo')
    app.listen(3000);
}
ativacaoDoServidor();