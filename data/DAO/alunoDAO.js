const bd = require('../bd');

async function cadastrarAluno(aluno) {
    const conexao = await bd.getConexao();
    if (conexao == null) return null;

    try {
        const sql = "insert into alunos (Nome,Idade,CEP) values(?,?,?)";
        const dados = [aluno.getNome(),aluno.getIdade(),aluno.getCep()];
        await conexao.query(sql, dados);
        return true;
    }
    catch (excecao) { return false; }
}

async function atualizarAluno(nome) {
    const conexao = await bd.getConexao();
    if (conexao == null) return null;
    try {
        const sql = 'UPDATE alunos SET Nome = ?, Idade = ?, CEP = ? WHERE Nome = ?';
        const dados = [aluno.nome,aluno.idade,aluno.cep];
        await conexao.query(sql, dados);
        return true;
    }
    catch (excecao) { return false; }
}


async function excluirAluno(nome) {
    const conexao = await bd.getConexao();
    if (conexao == null) return null;
    try {
        const sql = 'DELETE FROM alunos WHERE Nome = ?';
        const dados = [nome];
        await conexao.query(sql, dados);
        return true;
    }
    catch (excecao) {
        return false;
    }
}

async function getAluno(nome) {
    const conexao = await bd.getConexao();
    if (conexao == null) return null;
    try {
        const sql = "SELECT * FROM alunos WHERE Nome = ?"
        const dados = [nome];
        const [linhas] = await conexao.execute(sql, dados);
        return linhas;
    }
    catch (excecao) {
        return false;
    }
}

async function recupereTodos() {
    const conexao = await bd.getConexao();
    if (conexao == null) return null;
    try {
        const sql = 'SELECT * FROM alunos';
        const [linhas] = await conexao.query(sql);
        return linhas;
    }
    catch (excecao) { return false; }
}
module.exports = { cadastrarAluno, atualizarAluno, excluirAluno,getAluno,recupereTodos}