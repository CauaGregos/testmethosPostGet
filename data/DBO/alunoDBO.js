class Aluno {
    #nome
    #idade
    #cep
    #id

    constructor(id,nome, idade, cep) {
        this.#id = id
        this.#nome = nome
        this.#idade = idade
        this.#cep = cep
        
    }

    getNome() {
        return this.#nome;
    }

    getIdade() {
        return this.#idade;
    }

    getCep() {
        return this.#cep;
    }

    getId() {
        return this.#id;
    }

    setNome(nome) {
        if (nome === undefined || typeof nome !== 'string' || nome ==="" )
        throw ('Nome inválidp')

        this.#nome = nome;
    }

    setIdade(idade) {
        if (idade === undefined || typeof idade !== 'number' || idade <= 0 )
        throw ('Nome inválidp')

        this.#idade = idade;
    }

    setCep(cep) {
        if (cep === undefined || typeof cep !== 'number' || cep <= 0 )
        throw ('Nome inválidp')

        this.#cep = cep;
    }

    setId(id) {
        if (id === undefined || typeof id !== 'number' || id <= 0 )
        throw ('id inválido')

        this.#id = id;
    }
}

function novo(id,nome, idade, cep) {
    return new Aluno(id,nome, idade, cep)
}

module.exports = {novo}