const bd = require('../bd');
const bdConfig = require('../bdConfig');
const AlunoDAO = require('../DAO/alunoDAO');
const AlunoDBO = require('../DBO/alunoDBO');
const comunicado=require('./comunicado.js');

async function cadastrarAluno(req, res) {
    if (Object.values(req.body).length != 4 || !req.body.id|| !req.body.Nome || !req.body.Idade || !req.body.CEP) {
        const erro=comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 4 informações esperadas de um Aluno').object;
        return res.status(422).json(erro)
    }
    
    let aluno;
    try {
        aluno = AlunoDBO.novo(req.body.id,req.body.Nome, req.body.Idade, req.body.CEP)
    } catch (error) {
        const erro=comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um aluno(nome, idade e cep)').object;
        return res.status(422).json(erro);
    }
    const ret = await AlunoDAO.cadastrarAluno(aluno)

    if (ret === undefined) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }

    const sucesso=comunicado.novo('RBS','Inclusão bem sucedida','sucess').object; 
    return res.status(201).json(sucesso);

}

async function atualizarAluno(req, res) {
    
    if (Object.values(req.body).length != 4|| !req.body.id  || !req.body.Nome || !req.body.Idade || !req.body.CEP) {
        const erro=comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 4 informações esperadas de um aluno(nome, idade e cep)').object;
        return res.status(422).json(erro)
    }
    
    let aluno;
    try {
        aluno = AlunoDBO.novo(req.body.id,req.body.Nome, req.body.Idade, req.body.CEP)
    } catch (error) {
        const erro=comunicado.novo('Ddi','Dados inesperados','Falha ao gerar DBO do Aluno.').object;
        return res.status(422).json(erro);
    }


    const id=req.params.id; // pegando o codigo

    // testanto se foi tentado alterar o codigo do aluno
    if (id!=aluno.id) {
        const erro=comunicado.novo('TMC','Mudança de id','Tentativa de mudar RA do Aluno').object; 
        return res.status(400).json(erro); 

    }

    let ret = await AlunoDAO.getAluno(id)
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    if (ret === false) {
        const erro=comunicado.novo('LJE','Aluno nao existe','nao existe aluno cadastrado com esse id').object; 
        return res.status(409).json(erro)
    }
    if (ret.length == 0) {
        const erro=comunicado.novo('LJE','Houve um problema','Não foi possivel atualizar o dados do Aluno').object; 
        return res.status(404).json(erro);
    }

    ret = await AlunoDAO.atualizarAluno(aluno)

    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }

    if (ret === false) {
        const erro=comunicado.novo('LJE','Aluno nao existe','nao existe aluno cadastrado com esse id').object; 
        return res.status(409).json(erro)
    }

    const sucesso=comunicado.novo('RBS','Atualizacao bem sucedida','O aluno foi atualizado com sucesso').object; 
    return res.status(201).json(sucesso);
}

async function excluirAluno(req, res) {
    
    if (Object.values(req.body).length != 0) {

        const erro=comunicado.novo('Ddi','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object;
        return res.status(422).json(erro);

    }

    const id = req.params.id; 
    let ret = await AlunoDAO.getAluno(id); 
    //Tratando erros do recupereUm

    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);
    }

    if (ret === false) { 
        const erro=comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro);
    }

    if (ret.length == 0) {
        const erro=comunicado.novo('LNE','inexistente','Não há aluno cadastrado com esse id').object; 
        return res.status(404).json(erro);
    }

    // removendo o aluno
    ret = await AlunoDAO.excluirAluno(id);

    //Tratando erros do remova
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);
    }

    if (ret === false) {

        const erro = comunicado.novo('FNC', 'Falha no comando de SQL', 'O comando de SQL apresenta algum erro').object;
        return res.status(409).json(erro);

    }

    // se chegou aqui é porque deu certo
    const sucesso = comunicado.novo('RBS', 'Remoçao bem sucedida', 'O Aluno foi removido com sucesso').object;
    return res.status(201).json(sucesso);

}

async function getAluno(req, res) {
    if (Object.values(req.body).length!=0) {

        const erro=comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
        
    }

    const id=req.perams.id; // pego o codigo

    const ret = await AlunoDAO.getAluno(id); // utilizo o recupera um

    //Trato os erros do recupera um
    if (ret===null) {

        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
        
    }

    if (ret===false) {

        const erro=comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
        
    }

    if (ret.length==0) {

        const erro=comunicado.novo('LNE','Aluno inexistente','Não há um aluno cadastrado com esse id').object; 
        return res.status(404).json(erro); 
        
    }

    //Se chegou ate aqui deu tudo certo, entao retorno o meu aluno
    return res.status(200).json(ret);


}

async function recupereTodos(req, res) {
    if (Object.values(req.body).length!=0) {

        const erro=comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
        
    }

    const ret= await AlunoDAO.recupereTodos(); // recuperando 

    //Tratando erros
    if (ret===null) {

        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro); 
        
    }

    if (ret===false) {

        const erro=comunicado.novo('FNC','Falha no comando de SQL','O comando de SQL apresenta algum erro').object; 
        return res.status(409).json(erro); 
        
    }

    // se chegou até aqui ocorreu tudo certo
    return res.status(200).json(ret); // retorno ret
}

module.exports={cadastrarAluno,atualizarAluno,excluirAluno,getAluno,recupereTodos};

