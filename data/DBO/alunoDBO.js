class Aluno {
    #nome
    #idade
    #cep

    constructor(nome, idade, cep) {
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
}

function novo(nome, idade, cep) {
    return new Aluno(nome, idade, cep)
}

module.exports = {novo}