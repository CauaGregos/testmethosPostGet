const bd = require('../bd');
const bdConfig = require('../bdConfig');
const AlunoDAO = require('../DAO/alunoDAO');
const AlunoDBO = require('../DBO/alunoDBO');
const comunicado=require('./comunicado.js');

async function cadastrarAluno(req, res) {
    // if (Object.values(req.body).length != 3 || !req.body.nome || !req.body.idade || !req.body.cep) {
    //     const erro=comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object;
    //     return res.status(422).json(erro)
    // }
    console.log(req.body.Nome+ req.body.Idade + req.body.CEP)
    let aluno;
    try {
        aluno = AlunoDBO.novo(req.body.Nome, req.body.Idade, req.body.CEP)
    } catch (error) {
        const erro=comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object;
        return res.status(422).json(erro);
    }
    console.log(aluno.getNome())
    const ret = await AlunoDAO.cadastrarAluno(aluno)

    if (ret === undefined) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }

    const sucesso=comunicado.novo('RBS','Inclusão bem sucedida','sucess').object; 
    return res.status(201).json(sucesso);

}

async function atualizarAluno(req, res) {
    if (Object.values(req.body).length != 3 || !req.body.nome || !req.body.idade || !req.body.cep) {
        const erro=comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object;
        return res.status(422).json(erro)
    }

    let aluno;
    try {
        aluno = AlunoDBO.novo(req.body.nome, req.body.idade, req.body.cep)
    } catch (error) {
        const erro=comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object;
        return res.status(422).json(erro);
    }

    let ret = await AlunoDAO.getAluno(req.body.nome)
    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }
    if (ret === false) {
        const erro=comunicado.novo('LJE','Livro já existe','Já existem livros cadastrados com esse codigo').object; 
        return res.status(409).json(erro)
    }
    if (ret.length == 0) {
        return res.status(404).json(erro);
    }

    ret = await AlunoDAO.atualizarAluno(aluno)

    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro)
    }

    if (ret === false) {
        const erro=comunicado.novo('LJE','Livro já existe','Já existem livros cadastrados com esse codigo').object; 
        return res.status(409).json(erro)
    }

    const sucesso=comunicado.novo('RBS','Remoçao bem sucedida','O livro foi removido com sucesso').object; 
    return res.status(201).json(sucesso);
}

async function excluirAluno(req, res) {

    if (Objects.values(req.body).length != 0) {

        const erro=comunicado.novo('Ddi','Dados inesperados','Não foram fornecidos exatamente as 3 informações esperadas de um livro(codigo, nome e preço)').object;
        return res.status(422).json(erro);

    }

    const nome = req.body.nome; 
    let ret = await AlunoDAO.getAluno(nome); 
    //Tratando erros do recupereUm

    if (ret === null) {
        const erro=comunicado.novo('CBD','Sem conexao com o BD','Não foi possivel estabelecer conexao com o banco de dados').object; 
        return res.status(500).json(erro);
    }

    if (ret === false) { 
        const erro=comunicado.novo('LJE','Livro já existe','Já existem livros cadastrados com esse codigo').object; 
        return res.status(409).json(erro);
    }

    if (ret.length == 0) {
        return res.status(404).json(erro);
    }

    // removendo o livro
    ret = await AlunoDAO.excluirAluno(nome);

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
    const sucesso = comunicado.novo('RBS', 'Remoçao bem sucedida', 'O livro foi removido com sucesso').object;
    return res.status(201).json(sucesso);

}

async function getAluno(req, res) {
    if (Object.values(req.body).length!=0) {

        const erro=comunicado.novo('DSP','Fornecimento de dados sem proposito','Foram fornecidos dados desnecessarios').object; 
        return res.status(422).json(erro); 
        
    }

    const nome=req.body.nome; // pego o codigo

    const ret = await AlunoDAO.getAluno(nome); // utilizo o recupera um

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

        const erro=comunicado.novo('LNE','Livro inexistente','Não há livro cadastrado com esse código').object; 
        return res.status(404).json(erro); 
        
    }

    //Se chegou ate aqui deu tudo certo, entao retorno o meu livro
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

