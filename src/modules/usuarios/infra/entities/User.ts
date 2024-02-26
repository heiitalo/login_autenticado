class User {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  dt_nascimento: Date;
  reseteToken: string;
  foto: string;
  created_at: Date;
  updated_at: Date;
  updatedSenha_at: Date;

  constructor(
    id: string,
    nome: string,
    cpf: string,
    email: string,
    senha: string,
    dt_nascimento: Date,
    reseteToken: string,
    foto: string,
    created_at: Date,
    updated_at: Date,
    updatedSenha_at: Date
  ) {
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
    this.updatedSenha_at = updatedSenha_at
  }
}

export { User };
