"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, nome, cpf, email, senha, dt_nascimento, reseteToken, foto, created_at, updated_at, updatedSenha_at) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.dt_nascimento = dt_nascimento;
        this.reseteToken = reseteToken;
        this.foto = foto;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.updatedSenha_at = updatedSenha_at;
    }
}
exports.User = User;
